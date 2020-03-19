import Vue from 'vue';
import Vuex from 'vuex';
import { getGeocodePosition } from '../services/Google.service';
import { saveToLocalStorage } from '../services/Storage.service';
import { getWeatherData } from '../services/Weather.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventState: {
      events: null,
      loading: false
    },
    placeState: {
      loading: false,
      location: null,
      places: null
    },
    searchState: {
      location: null,
      query: null
    },
    weatherState: {
      loading: false,
      weather: null
    }
  },
  mutations: {
    updateSearch(state, newState) {
      state.searchState = newState;
    },
    updateWeather(state, newState) {
      state.weatherState.weather = newState;
    },
    updateLoading(state, property, value) {
      state[property].loading = value;
    }
  },
  actions: {
    startApp(context, payload) {
      context.commit('updateLoading', ('weatherState', true));
    },
    async searchQuery(context, payload) {
      const result = await getGeocodePosition(payload.query);
      context.commit('updateSearch', { query: payload.query, location: result });
      context.dispatch('getWeather', { lat: result.lat, lng: result.lng });
    },
    async getWeather(context, payload) {
      const result = await getWeatherData(payload);
      console.log('res from weather', result);
      context.commit('updateWeather', result);
      saveToLocalStorage(this.state);
    }
  },
  modules: {}
});
