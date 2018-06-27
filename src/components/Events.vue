<template>
    <div class="events-container">
        <span class="tag is-dark is-large">Upcoming Events In {{ location.cityName }}</span>
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
                               <p class="card-subtitle">{{ event.start.local }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
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
                events: state.events,
                location: state.location,
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
                this.events = state.events;
            };
        },
        updated() {
            this.location = state.location;
            this.places = state.places;
        },
        mounted() {
            eventBus.$on('newLocation', (location) => {

                // Gets the lat and lng of the city name or zipcode that was queried
                const event_token = 'R4SCC5Z2YX3I7X2YRKE7';
                const event_url = `https://www.eventbriteapi.com/v3/events/search/`;
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                axios.get(`${event_url}?&location.latitude=${location.lat}&location.longitude=${location.lng}&token=${event_token}`)
                .then(response => {
                    this.results = response.data.events;

                    state.events = this.results;
                    this.events = state.events;
                    this.location = location;

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
    }
    .card {
        height: 250px;
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
</style>