<template>
    <div>
        <!-- <select v-model="locationType" v-on:change="getPlaces">
            <option value="Active Life">Active Life</option>
            <option value="Arts & Entertainment">Arts & Entertainment</option>
            <option value="Automotive">Automotive</option>
            <option value="Beauty & Spas">Beauty & Spas</option>
            <option value="Education">Education</option>
            <option value="Event Planning & Services">Event Planning & Services</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Food">Food</option>
            <option value="Health & Medical">Health & Medical</option>
            <option value="Home Services">Home Services</option>
            <option value="Hotels & Travel">Hotels & Travel</option>
            <option value="Local Flavor">Local Flavor</option>
            <option value="Local Services">Local Services</option>
            <option value="Mass Media">Mass Media</option>
            <option value="Nightlife">Nightlife</option>
            <option value="Pets">Pets</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Public Services & Government">Public Services & Government</option>
            <option value="Real estate">Real estate</option>
            <option value="Religious Organizations">Religious Organizations</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Shopping">Shopping</option>
        </select> -->
        <p class="subtitle is-4">Places To Eat</p>
        <div v-for="place in places" :key="place.id" class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img v-if="place.image_url" :src="place.image_url" alt="place.name" />
                    <img v-else src="http://via.placeholder.com/350x350" alt="place.name" />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{ place.name }}</p>
                        <p class="subtitle is-6">{{ place.location.address1 }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus, state } from '../main';
    import axios from 'axios';

    export default {
        data: function() {
            return {
                places: state.places,
                location: state.location,
                locationType: 'Food'
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.location = state.location;
                this.places = state.places;
            };
        },
        // methods: {
        //     getPlaces() {
        //         console.log('getPlaces', location.cityName);
        //         // Gets the lat and lng of the city name or zipcode that was queried
        //         const yelp_url = 'https://api.yelp.com/v3/businesses/search';
        //         const yelp_token = 'OO7yjS5Re_tG1oieUdRCyvpbj2gbxiyDv6nZCBx803xeDXDRPFYQSz54CUGETUz-WV6PB-0Dvrc1DR9RX03sGu3pQsFE9Kwbb7rPGPehEwUoDYfNsBeLxl0mP6oEW3Yx';
        //         const proxy = 'https://cors-anywhere.herokuapp.com/';

        //         axios.get(`${proxy}${yelp_url}?&latitude=${state.location.lat}&longitude=${state.location.lng}&radius=5000&term=${this.locationType}`, {
        //             headers: {
        //                 Authorization: `Bearer ${yelp_token}`
        //             }
        //         })
        //         .then(response => {
        //             this.results = response.data.businesses;

        //             state.places = this.results;
        //             this.places = state.places;

        //             localStorage.setItem('state', JSON.stringify(state));
        //         });
        //     }
        // },
        mounted() {
            eventBus.$on('newLocation', (location) => {

                // Gets the lat and lng of the city name or zipcode that was queried
                const yelp_url = 'https://api.yelp.com/v3/businesses/search';
                const yelp_token = 'OO7yjS5Re_tG1oieUdRCyvpbj2gbxiyDv6nZCBx803xeDXDRPFYQSz54CUGETUz-WV6PB-0Dvrc1DR9RX03sGu3pQsFE9Kwbb7rPGPehEwUoDYfNsBeLxl0mP6oEW3Yx';
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                axios.get(`${proxy}${yelp_url}?&latitude=${location.lat}&longitude=${location.lng}&radius=5000&term=${this.locationType}`, {
                    headers: {
                        Authorization: `Bearer ${yelp_token}`
                    }
                })
                .then(response => {
                    this.results = response.data.businesses;

                    state.places = this.results;
                    this.places = state.places;

                    localStorage.setItem('state', JSON.stringify(state));
                });       
            });           
        }
    };
</script>

<style scoped>
    .card {
        margin: 30px 0 30px 0;
    }
</style>