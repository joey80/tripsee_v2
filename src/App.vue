<template>
  <div class="container app-container">
    <div class="body-container">
      <div class="sidebar">
        Coming soon!
      </div>
      <div>
        <app-header></app-header>
        <searchBar></searchBar>
        <weatherSection></weatherSection>
        <placeSection></placeSection>
        <eventSection></eventSection>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Search from './components/Search.vue';
  import Weather from './components/Weather.vue';
  import Places from './components/Places.vue';
  import Events from './components/Events.vue';
  import { eventBus, state } from './main';

  export default {
    components: {
      appHeader: Header,
      searchBar: Search,
      weatherSection: Weather,
      placeSection: Places,
      eventSection: Events
    },
    data: function() {
      return {
      }
    },
    mounted() {
      eventBus.$on('menuClick', (click) => {
        // change the sidebar to off screen
        const sideBar = document.querySelector('.sidebar');
        sideBar.classList.toggle("move");
      });
    }
  };
</script>

<style>
  body {
    font-family: 'Muli', sans-serif;
    background-color: #f8f8f8;
    background-image: url('../src/assets/images/bg.jpg');
  }
  .sidebar {
    position: absolute;
    text-align: right;
    padding: 30px;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100vh;
    color: #fff;
    background-color: #363636;
    transform: translateX(-100%);
    transition: all 0.5s ease-in-out;
  }
  .move {
    transform: translateX(-20%);
    transition: all 0.5s ease-in-out;
  }
  .body-container {
    padding: 10px;
    background-color: #e2e2e2;
    box-shadow: 0px 0px 59px -11px rgba(0,0,0,0.55);
  }
  .app-container {
    max-width: 375px;
    overflow: hidden;
  }
</style>
