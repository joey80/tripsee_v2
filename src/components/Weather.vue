<template>
    <div>
        <div v-if="loading" class="loading">
            Loading weather
            <div class="circle"></div>
        </div>
        <div v-if="!loading" class="card">        
            <div class="card-footer">
                <div class="card-footer-item dark">
                    <img :src="'../src/assets/weather/' + weather.icon + '.png'">
                </div>
                <div class="card-footer-item light">
                    <div class="item-center">
                        <span class="temp">{{ weather.temp }}&#176;</span>
                        <span class="name">Currently {{ weather.description }}<br />in <strong>{{ weather.name }}</strong></span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-footer-item">                
                    <p class="forecast">{{ weather.forecast }}</p>
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
                weather: '',
                location: '',
                loading: false
            };
        },
        created() {
            if(state) {
                const appState = JSON.parse(localStorage.getItem('state'));
                this.weather = appState.weather;
            };
        },
        mounted() {
            eventBus.$on('newLocation', (location) => {
                
                // Shows the loading animation
                this.loading = true;

                // Gets the weather from the location lat and lng
                const url = 'https://api.darksky.net/forecast/';
                const key = '0f17cf28d5077a6eaa100a5baed07ef0';
                const proxy = 'https://cors-anywhere.herokuapp.com/';

                axios.get(`${proxy}${url}${key}/${location.lat},${location.lng}`)
                .then(response => {
                    this.temp = response.data.currently.temperature;
                    this.description = response.data.currently.summary;
                    this.name = location.cityName;
                    this.icon = response.data.currently.icon;
                    this.forecast = response.data.daily.summary;

                    // Store the repsonse in the state.weather object
                    state.weather = {
                        temp: Math.floor(this.temp),
                        description: this.description,
                        name: this.name,
                        icon: this.icon,
                        forecast: this.forecast
                    }

                    this.weather = state.weather;

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
    .card {
        margin: 30px 0 30px 0;
    }
    .dark {
        background-color: #5a9216;
        color: #fff;
        border: 0;
        flex-grow: 2;
    }
    .light {
        background-color: #8BC34A;
        color: #000;
        border: 0;
        flex-grow: 4;
    }
    .temp {
        display: block;
        font-size: 3.8em;
        font-weight: bold;
    }
    .name {
        display: block;
        line-height: 1.2em;
    }
    .item-center {
        text-align: center;
    }
    .card-footer-item {
        border: 0;
    }
    .forecast {
        font-size: 0.8em;
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