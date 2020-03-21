import Vue from 'vue';
import Vuex from 'vuex';
import { getGeocodePosition } from '../services/Google.service';
import { getWeatherData } from '../services/Weather.service';
// import { saveToLocalStorage } from '../services/Storage.service';

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
      state.searchState = { ...state.searchState, ...newState };
    },
    updateWeather(state, newState) {
      state.weatherState = { ...state.weatherState, ...newState };
    }
  },
  actions: {
    startApp(context, payload) {
      context.dispatch({ type: 'searchQuery', query: payload.query }).then(res => {
        res.dispatch({ type: 'getWeather', res });
        // res.dispatch({ type: 'getPlaces', res });
        // res.dispatch({ type: 'getEvents', res });
      });
    },
    async searchQuery(context, payload) {
      const result = await getGeocodePosition(payload.query);
      context.commit('updateSearch', { query: payload.query, location: result });
      return context;
    },
    async getWeather(context) {
      context.commit('updateWeather', { loading: true });
      const result = await getWeatherData({
        lat: context.state.searchState.location.lat,
        lng: context.state.searchState.location.lng
      });
      return context.commit('updateWeather', { loading: false, weather: result });
    }
  },
  modules: {}
});
