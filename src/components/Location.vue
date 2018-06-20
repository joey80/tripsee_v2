<template>
    <div>
        <h1>This is the location component. Results are {{location}}</h1>
    </div>
</template>

<script>
    import { eventBus, state } from '../main';
    import axios from 'axios';

    export default {
        props: {
            newLocation: {
                type: Object
            }
        },
        data: function() {
            return {
                results: null,
                query: state.query,
                location: state.location
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.query = state.query;
                this.location = state.location;
            };
        },
        mounted() {
            eventBus.$on('newQuery', (query) => {
                this.query = query;

                // Gets the lat and lng of the city name or zipcode that was queried
                var encodedAddress = encodeURIComponent(this.query);
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

                    localStorage.setItem('state', JSON.stringify(state));
                });
            });           
        }
    };
</script>

<style>
</style>