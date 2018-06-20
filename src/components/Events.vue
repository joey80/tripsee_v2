<template>
    <div>
        <p class="subtitle is-4">Things To Do</p>
        <div v-for="event in events" :key="event.id" class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <!-- <img v-bind:src="event.logo.original.url" alt="event.name.text" /> -->
                    <img v-if="event.logo" :src="event.logo.original.url" alt="event.name" />
                    <img v-else src="http://via.placeholder.com/350x350" alt="event.name" />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{ event.name.text }}</p>
                        <p class="subtitle is-6">{{ event.start.local }}</p>
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
                events: state.events,
                location: state.location
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.location = state.location;
                this.events = state.events;
            };
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

                    localStorage.setItem('state', JSON.stringify(state));
                    console.log('from mounted events', state.events);
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