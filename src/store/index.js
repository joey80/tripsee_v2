import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventState: {
      events: null
    },
    placeState: {
      places: null,
      location: null
    },
    searchState: {
      query: null,
      location: null
    },
    weatherState: {
      weather: null
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
