import Vue from 'vue';
import Vuex from 'vuex';
import { getGeocodePosition } from '../services/Google.service';

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
    }
  },
  actions: {
    async searchQuery(context, payload) {
      const result = await getGeocodePosition(payload.query);
      context.commit('updateSearch', { query: payload.query, location: result });

      // // Save it to LocalStorage
      // localStorage.setItem('tripsee_state', JSON.stringify(state));
    }
  },
  modules: {}
});
