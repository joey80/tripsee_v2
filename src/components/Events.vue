<template>
    <div>
        <div v-if="loading" class="loading">
            Loading events
            <div class="circle"></div>
        </div>
        <div v-if="!loading" class="events-container">
            <span class="tag">Upcoming Events In <span class="tag-primary-color">&nbsp;{{ location.cityName }}</span></span>
            <swiper :options="swiperOption">
                <swiper-slide v-for="event in events" :key="event.id">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img v-if="event.logo" :src="event.logo.original.url" alt="event.name.text" />
                                <img v-else src="http://via.placeholder.com/350x350" alt="event.name.text" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                <p class="card-title">{{ event.name.text }}</p>
                                <p class="card-subtitle">{{ getTheDate(event.start.local) }}</p>
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
                events: '',
                location: '',
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
            if(state) {
                const appState = JSON.parse(localStorage.getItem('state'));
                this.location = appState.location;
                this.events = appState.events;
            };
        },
        methods: {
            getTheDate(date) {
                const newDate = new Date(date).toLocaleDateString();
                const newTime = new Date(date).toLocaleTimeString();

                return `${newDate} @ ${newTime}`;
            }
        },
        mounted() {
            eventBus.$on('newLocation', (location) => {

                // Shows the loading animation
                this.loading = true;

                // Gets the lat and lng of the city name or zipcode that was queried
                const event_token = 'R4SCC5Z2YX3I7X2YRKE7';
                const event_url = `https://www.eventbriteapi.com/v3/events/search/`;
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                axios.get(`${event_url}?&location.latitude=${location.lat}&location.longitude=${location.lng}&token=${event_token}`)
                .then(response => {
                    this.results = response.data.events;

                    // Store the repsonse in the state.events object
                    state.events = this.results;

                    // Update the data with the new events and city name (inside of location)
                    this.events = state.events;
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
    .events-container {
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
        height: 350px;
        padding-bottom: 40px;
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