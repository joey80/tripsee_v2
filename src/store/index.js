import Vue from 'vue';
import Vuex from 'vuex';

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
    searchQuery: (state, query) => {
      console.log('you searched for', query);
      state.searchState.query = query;
    }
  },
  actions: {},
  modules: {}
});
