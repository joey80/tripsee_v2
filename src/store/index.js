import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getGeocodePosition } from '../services/Google.service';
import { getWeatherData } from '../services/Weather.service';
import { getYelpPlaces } from '../services/Places.service';
import { getEventfulEvents } from '../services/Events.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventState: {
      events: null,
      loading: false
    },
    placeState: {
      loading: false,
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
    },
    updatePlaces(state, newState) {
      state.placeState = { ...state.placeState, ...newState };
    },
    updateEvents(state, newState) {
      state.eventState = { ...state.eventState, ...newState };
    }
  },
  actions: {
    startApp(context, payload) {
      context.dispatch({ type: 'searchQuery', query: payload.query }).then(res => {
        res.dispatch({ type: 'getWeather', res });
        res.dispatch({ type: 'getPlaces', res });
        res.dispatch({ type: 'getEvents', res });
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
    },
    async getPlaces(context) {
      context.commit('updatePlaces', { loading: true });
      const result = await getYelpPlaces({
        lat: context.state.searchState.location.lat,
        lng: context.state.searchState.location.lng
      });
      return context.commit('updatePlaces', { loading: false, places: result });
    },
    async getEvents(context) {
      context.commit('updateEvents', { loading: true });
      const result = await getEventfulEvents({
        lat: context.state.searchState.location.lat,
        lng: context.state.searchState.location.lng
      });
      return context.commit('updateEvents', { loading: false, events: result.search.events.event });
    }
  },
  modules: {},
  plugins: [new VuexPersistence().plugin]
});
