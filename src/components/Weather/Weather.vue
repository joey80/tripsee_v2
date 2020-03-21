<template>
  <section>
    <span>{{ weatherState.loading }}</span>
    <!-- <div v-if="loading" class="loading">
      Loading weather
      <trip-spinner />
    </div>
    <div v-else class="card">
      <div class="card-footer">
        <div class="card-footer-item dark">
          <img :src="`../src/assets/weather/'${icon}.png`" />
        </div>
        <div class="card-footer-item light">
          <div class="item-center">
            <span class="temp">{{ temp }}&#176;</span>
            <span class="name"
              >Currently {{ description }}<br />in <strong>{{ name }}</strong></span
            >
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          <p class="forecast">{{ forecast }}</p>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
// import Spinner from '../atoms/Spinner/Spinner.vue';

export default {
  components: {
    // tripSpinner: Spinner
  },
  computed: mapState(['weatherState']),
  watch: {
    weatherState(newValue, oldValue) {
      console.log('weather state change', {
        oldValue,
        newValue
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
