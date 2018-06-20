<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Current Weather in {{ weather.name }}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <p class="title is-2">{{ weather.temp }}&#176;</p>
                <p class="subtitle is-5">{{ weather.description }}</p>
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
                weather: '',
                location: ''
            };
        },
        created() {
            if(state) {
                const state = JSON.parse(localStorage.getItem('state'));
                this.location = state.location;
                this.weather = state.weather;
            }
        },
        mounted() {
            eventBus.$on('newLocation', (location) => {
                
                // Gets the weather from the location lat and lng
                const url = 'https://api.darksky.net/forecast/';
                const key = '0f17cf28d5077a6eaa100a5baed07ef0';
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                axios.get(`${proxy}${url}${key}/${location.lat},${location.lng}`)
                .then(response => {
                    this.temp = response.data.currently.temperature;
                    this.description = response.data.currently.summary;
                    this.name = location.cityName;

                    state.weather = {
                        temp: this.temp,
                        description: this.description,
                        name: this.name
                    }

                    this.weather = state.weather;

                    // Save it to LocalStorage
                    localStorage.setItem('state', JSON.stringify(state));
                });
            });         
        }
    };
</script>

<style scoped>
    header {
        margin-top: 50px;
    }
    .card {
        margin-bottom: 30px;
    }
</style>