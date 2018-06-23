<template>
    <div class="card">
        <div class="card-footer">
            <div class="card-footer-item dark">
                ICON
            </div>
            <div class="card-footer-item light">
                <div class="item-center">
                    <span class="temp">{{ weather.temp }}&#176;</span>
                    <span class="name">Currently {{ weather.description }}<br />in {{ weather.name }}</span>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item">                
                <p class="subtitle is-5">DAY 1</p>
            </div>
            <div class="card-footer-item">                
                <p class="subtitle is-5">DAY 2</p>
            </div>
            <div class="card-footer-item">                
                <p class="subtitle is-5">DAY 3</p>
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
    .card {
        margin: 30px 0 30px 0;
    }
    .dark {
        background-color: #7fa953;
        color: #fff;
        border: 0;
        flex-grow: 2;
    }
    .light {
        background-color: #ade16d;
        color: #494949;
        border: 0;
        flex-grow: 4;
    }
    .temp {
        display: block;
        font-size: 3.5em;
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
</style>