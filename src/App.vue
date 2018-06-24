<template>
  <div class="container app-container">
    <app-header></app-header>
    <div class="body-container">
      <searchBar :newLocation='location' @newLocation='location = $event'></searchBar>
      <weatherSection></weatherSection>
      <placeSection></placeSection>
      <eventSection></eventSection>
      <!-- <div class="row">
        <div class="col-xs-12">
          <router-view></router-view>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Search from './components/Search.vue';
  import Weather from './components/Weather.vue';
  import Places from './components/Places.vue';
  import Events from './components/Events.vue';

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
        location: ''
      }
    }
  }
</script>

<style>
  body {
    font-family: 'Muli', sans-serif;
    background-color: #f8f8f8;
  }
  .body-container {
    padding: 10px;
  }
  .app-container {
    max-width: 375px;
  }
</style>
