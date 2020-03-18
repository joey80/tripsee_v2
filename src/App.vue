<template>
  <div class="app-container">
    <div class="body-container">
      <trip-sidebar :isOpen="isOpen" />
      <template>
        <trip-header :onClick="handleClick" />
        <trip-search />
        <trip-weather />
        <trip-places />
        <trip-events />
      </template>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Search from './components/Search/Search.vue';
import Weather from './components/Weather/Weather.vue';
import Places from './components/Places/Places.vue';
import Events from './components/Events/Events.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';

export default {
  components: {
    tripHeader: Header,
    tripSearch: Search,
    tripWeather: Weather,
    tripPlaces: Places,
    tripEvents: Events,
    tripSidebar: Sidebar
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    handleClick() {
      this.isOpen = !this.isOpen;
      return console.log('you clicked me');
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  background-color: #f8f8f8;
  background-image: url('../src/assets/images/bg.jpg');
}

.body-container {
  padding: 10px;
  background-color: #e2e2e2;
  box-shadow: 0px 0px 59px -11px rgba(0, 0, 0, 0.55);
  position: relative;
}

.app-container {
  margin: 0 auto;
  max-width: 375px;
  overflow: hidden;
}
</style>
