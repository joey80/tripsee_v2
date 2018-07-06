<template>
    <div class="search-container">
        <form v-on:submit.prevent="logQuery" autocomplete="off">
            <div class="field">
                <p class="control has-icons-left">
                    <input v-model="query" id="search" class="input is-medium is-rounded" placeholder="Enter A City Name Or A Zipcode">
                    <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import { eventBus, state } from '../main';
    import axios from 'axios';

    export default {
        data: function() {
            return {
                query: ''
            };
        },
        methods: {
            logQuery() {
                state.query = this.query;

                // Hide the virtual keyboard
                document.getElementById('search').blur();

                // Save it to LocalStorage
                localStorage.setItem('state', JSON.stringify(state));

                // Emit the new event that the query has changed
                eventBus.$emit('newQuery', state.query);

                // Empty the contents of the search field
                this.query = '';
            }
        },
        mounted() {
            eventBus.$on('newQuery', (query) => {

                // Gets the lat and lng of the city name or zipcode that was queried
                var encodedAddress = encodeURIComponent(query);
                var google_key = 'AIzaSyAJjn9fajSJUjnvGy8SKqF914tFqHM15kU';
                var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${google_key}`;

                axios.get(geocodeUrl)
                .then(response => {
                    this.lat = response.data.results[0].geometry.location.lat;
                    this.lng = response.data.results[0].geometry.location.lng;
                    this.formatted_address = response.data.results[0].formatted_address;

                    //this split is more reliable as the city named changes in the result
                    //list if you searched for a zipcode or city name. The formatted address
                    //never changes in the results
                    this.cityName = this.formatted_address.split(',')[0];

                    // Store the repsonse in the state.location object
                    state.location = {
                        lat: this.lat,
                        lng: this.lng,
                        formatted_address: this.formatted_address,
                        cityName: this.cityName
                    }

                    // Save it to LocalStorage
                    localStorage.setItem('state', JSON.stringify(state));

                    // Emit the new event that the location has changed
                    eventBus.$emit('newLocation', state.location);
                });
            });         
        }
    };
</script>

<style scoped>
    .search-container {
        margin-top: 10px;
    }
    .input {
        box-shadow: none;
    }
    #search {
        color: #322c49;
        font-size: 1.1em;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
    }
    #search:hover {
        border: 1px solid rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 10px 15px 5px rgba(0,0,0,0.05);
    }
    #search:focus {
        border: 0;
        outline: none;
        box-shadow: none;
    }
    .icon {
        transition: all 0.4s ease-in-out;
    }
</style>