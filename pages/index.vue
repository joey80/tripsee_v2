<template>
  <div class="app-container">
    <div class="body-container">
      <trip-header />
      <section class="search__container">
        <form v-on:submit.prevent="handleQuery" autocomplete="off">
          <input
            v-model="query"
            ref="searchInput"
            class="search__input"
            placeholder="Enter A City Name Or A Zipcode"
          />
        </form>
      </section>
      <trip-weather :cityName="cityName" :location="{ lat, lng }" />
      <trip-places :cityName="cityName" :location="{ lat, lng }" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header/Header';
import Places from '../components/Places/Places';
import Weather from '../components/Weather/Weather';

export default {
  components: {
    tripHeader: Header,
    tripPlaces: Places,
    tripWeather: Weather,
  },
  data() {
    return {
      cityName: '',
      lat: '',
      lng: '',
      query: '',
    };
  },
  methods: {
    async handleClick() {
      const res = await axios.get('/google/28031');
      // const res = await axios.get('/yelp?lat=35.472468&lng=-80.8875861');
      console.log(res.data);
    },
    async handleQuery() {
      const search = this.$refs.searchInput;
      search.value = '';
      search.blur();
      const res = await axios.get(`/google/${this.query}`);
      this.cityName = res.data.cityName;
      this.lat = res.data.lat;
      this.lng = res.data.lng;
      this.query = '';
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.app-container {
  margin: 0 auto;
  max-width: 375px;
  overflow: hidden;
}

body {
  font-family: 'Muli', sans-serif;
  background-color: #f8f8f8;
  background-image: url('~assets/images/bg.jpg');
}

.body-container {
  padding: 10px;
  background-color: #e2e2e2;
  box-shadow: 0px 0px 59px -11px rgba(0, 0, 0, 0.55);
  min-height: 100vh;
  position: relative;
}

.search {
  &__container {
    margin-top: 10px;

    &::before {
      background-image: url('~assets/images/search-icon.svg');
      background-size: contain;
      content: '';
      height: 25px;
      position: absolute;
      transform: translate(8px, 8px);
      width: 25px;
      z-index: 2;
    }
  }

  &__input {
    border: 1px solid transparent;
    border-radius: 290486px;
    box-shadow: none;
    color: #322c49;
    font-size: 1.1em;
    min-height: 40px;
    padding: 6px 18px 3px 40px;
    position: relative;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &::placeholder {
      color: rgb(216, 216, 216);
    }

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0px 10px 15px 5px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease-in-out;
    }

    &:focus {
      border: 0;
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
