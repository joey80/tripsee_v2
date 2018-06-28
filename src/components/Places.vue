<template>
    <div>
        <div v-if="loading" class="loading">
            Loading places
            <div class="circle"></div>
        </div>
        <div v-if="!loading" class="places-container">
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
            <span class="tag is-dark is-large">Places To See In {{ location.cityName }}</span>
            <swiper :options="swiperOption">
                <swiper-slide v-for="place in places" :key="place.id">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img v-if="place.image_url" :src="place.image_url" alt="place.name" />
                                <img v-else src="http://via.placeholder.com/350x350" alt="place.name" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                <span class="card-title">{{ place.name }}</span>
                                <p class="card-subtitle">{{ place.location.address1 }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    import { eventBus, state } from '../main';
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data: function() {
            return {
                places: state.places,
                location: state.location,
                locationType: 'Food',
                loading: false,
                swiperOption: {
                    spaceBetween: 10,
                    slidesPerView: 2
                }
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.location = state.location;
                this.places = state.places;
            };
        },
        updated () {
            this.location = state.location;
            this.places = state.places;
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
        //},
        mounted() {
            eventBus.$on('newLocation', (location) => {

                // Shows the loading animation
                this.loading = true;

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
                    this.location = location;

                    // Hides the loading animation showing the new data in the template
                    this.loading = false;

                    localStorage.setItem('state', JSON.stringify(state));
                });       
            });           
        }
    };
</script>

<style scoped>
    .places-container {
        margin: 60px 0 30px 0;
    }
    .tag {
        margin-bottom: 20px;
    }
    .card {
        height: 300px;
    }
    .card-title {
        font-size: 0.9em;
        font-weight: bold;
    }
    .card-subtitle {
        padding-top: 5px;
        font-size: 0.6em;
    }
    .card-content {
        padding: 10px;
    }
    .loading {
        margin: 40px auto;
        text-align: center;
        font-weight: bold;
        font-size: 0.7em;
        text-transform: uppercase;
    }
    .circle {
        margin: 20px auto;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 8px solid rgba(255, 255, 255, 0.2);
        border-top-color: #7fa953;
        animation: spin 1s infinite linear;
    }
    @keyframes spin { 
        100% { 
            transform: rotate(360deg); 
        } 
    }
</style>