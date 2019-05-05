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
            <span class="tag">Places To See In <span class="tag-primary-color">&nbsp;{{ location.cityName }}</span></span>
            <swiper :options="swiperOption">
                <swiper-slide v-for="place in places" :key="place.id">
                    <div class="card">
                        <div class="card-header">
                            <div class="header-container">
                                <span class="place-name">{{ place.name }}</span>
                                <div class="yelp">
                                    <div>
                                        <img :src="'../src/assets/images/yelp/' + place.rating + '.png'" class="card-rating">
                                        <span class="review-count">Based off of {{ place.review_count }} reviews</span>
                                    </div>
                                    <a :href="place.url" target="_blank"><img :src="'../src/assets/images/yelp/logo.png'" class="yelp-logo"></a>
                                </div>
                            </div>
                        </div>
                        <div class="card-image">
                            <!-- <figure class="image is-4by3"> -->
                                <!-- <div class="yelp-image" style="background-image: url(:src=place.image_url)" -->
                                <!-- <img v-if="place.image_url" :src="place.image_url" alt="place.name" /> -->
                                <div v-if="place.image_url" :style="{ 'background-image': 'url(' + place.image_url + ')' }" class="yelp-image"></div>
                                <div v-else :style="{ 'background-image': 'url(http://via.placeholder.com/350x350)' }" class="yelp-image"></div>
                                <!-- <img v-else src="http://via.placeholder.com/350x350" alt="place.name" /> -->
                            <!-- </figure> -->
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    Tags:
                                    <span v-if="place.categories[0]" class="tag">{{ place.categories[0].title }}</span>
                                    <span v-if="place.categories[1]" class="tag">{{ place.categories[1].title }}</span>
                                    <p class="card-subtitle">{{ place.display_phone }}</p>
                                    <p class="card-subtitle">{{ place.location.display_address[0] }}<br />
                                    {{ place.location.display_address[1] }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
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
                places: '',
                location: '',
                locationType: 'Food',
                loading: false,
                swiperOption: {
                    spaceBetween: 10,
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            };
        },
        created() {
            if (state) {
                const appState = JSON.parse(localStorage.getItem('state'));
                this.places = appState.places;
                this.location = appState.location;
            };
        },
        mounted() {
            eventBus.$on('newLocation', (location) => {

                // Shows the loading animation
                this.loading = true;

                // Searches for businesses from the lat and lng of the city name or zipcode that was queried
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

                    // Store the repsonse in the state.places object
                    state.places = this.results;

                    // Update the data with the new places and city name (inside of location)
                    this.places = state.places;
                    this.location = location;

                    // Hides the loading animation showing the new data in the template
                    this.loading = false;

                    // Save it to LocalStorage
                    localStorage.setItem('state', JSON.stringify(state));
                });       
            });           
        }
    };
</script>

<style scoped>
    .swiper-pagination {
        position: relative;
        transform: translateY(-15px);
    }
    .places-container {
        margin: 60px 0 30px 0;
    }
    .tag {
        margin-bottom: 20px;
        background-color: #323232;
        color: #fff;
        font-size: 0.8em;
    }
    .tag-primary-color {
        color: rgb(139, 195, 74);
    }
    .card {
        /* padding-bottom: 40px; */
        min-height: 550px;
    }
    .card-header {
        padding: 8px;
        font-size: 1.2em;
    }
    .card-rating {
        display: block;
        max-width: 40%;
    }
    .place-name {
        display: inline-block;
        padding-bottom: 10px;
        font-weight: bold;
    }
    .review-count {
        display: inline-block;
        padding-top: 5px;
        font-size: 0.6em;
        font-style: italic; 
    }
    .card-title {
        font-size: 0.9em;
        font-weight: bold;
    }
    .card-subtitle {
        padding-top: 5px;
        font-size: 0.8em;
    }
    .is-open {
        font-size: 0.8em;
        font-weight: bold;
        background-color: #5a9216;
    }
    .header-container {
        width: 100%;
    }
    .yelp {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .yelp-logo {
        max-width: 80px;
        border: 0;
    }
    .yelp-image {
        background-size: 400px;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    .card-content {
        padding: 10px;
    }
    .card-image {
        border-top: 8px solid #5a9216;
        border-bottom: 8px solid #5a9216;
        height: 270px;
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