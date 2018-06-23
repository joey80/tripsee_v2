<template>
    <div class="search-container card">
        <form v-on:submit.prevent="logQuery" autocomplete="off">
            <div class="field">
                <p class="control has-icons-left">
                    <input v-model="query" id="search" class="input  is-medium" placeholder="Where Would You Like To Go?">
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
                query: state.query,
                location: state.location
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.query = '';
                this.location = state.location;
            };
        },
        methods: {
            logQuery() {
                state.query = this.query;

                // Save it to LocalStorage
                localStorage.setItem('state', JSON.stringify(state));

                // Emit the new event that the query has changed
                eventBus.$emit('newQuery', state.query);

                // Empty the contents of the search field
                //this.query = '';
                document.getElementById('search').value = '';
            }
        },
        mounted() {
            eventBus.$on('newQuery', (query) => {
                //this.query = query;

                // Gets the lat and lng of the city name or zipcode that was queried
                var encodedAddress = encodeURIComponent(query);
                var google_key = 'AIzaSyAJjn9fajSJUjnvGy8SKqF914tFqHM15kU';
                var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${google_key}`;

                axios.get(geocodeUrl)
                .then(response => {
                    this.lat = response.data.results[0].geometry.location.lat;
                    this.lng = response.data.results[0].geometry.location.lng;
                    this.formatted_address = response.data.results[0].formatted_address;

                    //this split is more reliable as the city named changed in the result
                    //list if you searched for a zipcode or city name. The formatted address
                    //never changes in the results
                    this.cityName = this.formatted_address.split(',')[0];

                    state.location = {
                        lat: this.lat,
                        lng: this.lng,
                        formatted_address: this.formatted_address,
                        cityName: this.cityName
                    }

                    this.location = state.location;

                    // Save it to LocalStorage
                    localStorage.setItem('state', JSON.stringify(state));

                    // Emit the new event that the location has changed
                    eventBus.$emit('newLocation', state.location);
                    console.log('from search', state);
                });
            });         
        }
    };
</script>

<style scoped>
    .search-container {
        margin-top: 90px;
        padding: 20px 0 20px 0;
        box-shadow: 0px 21px 25px -4px rgba(0,0,0,0.1);
    }
    ::placeholder {
        color: #717171;
    }
    #search {
        color: #322c49;
        border: 0;
        box-shadow: none;
    }
    #search input[type=text]:focus {
        border: 0;
        outline: none;
        box-shadow: none;
    }
</style>