<template>
  <section>
    <template v-if="weatherState.loading === true">
      <trip-spinner />
    </template>
    <template v-else>
      <trip-card>
        <!-- <template slot="cardHeader">
          what is this?
        </template> -->
        <template slot="cardContent">
          <!-- {{ weatherState.weather }} -->
          <div class="weather__content">
            <div class="weather__content__left">
              <img
                :src="require(`../../assets/images/weather/${weatherState.weather.icon}.png`)"
                class="weather__image"
              />
            </div>
            <div class="weather__content__right">This is something on the right</div>
          </div>
        </template>
        <template slot="cardFooter">
          <span class="weather__footer">{{ weatherState.weather.forecast }}</span>
        </template>
      </trip-card>
    </template>

    <!-- <div v-else class="card">
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
import Spinner from '../atoms/Spinner/Spinner.vue';
import Card from '../atoms/Card/Card.vue';

export default {
  components: {
    tripCard: Card,
    tripSpinner: Spinner
  },
  data() {
    return {
      isLoading: null,
      weatherData: null
    };
  },
  computed: mapState(['weatherState'])
};
</script>

<style lang="scss" scoped>
.weather {
  &__content {
    display: flex;
    min-height: 150px;

    &__left {
      align-items: center;
      background-color: #5a9216;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      width: 40%;
    }

    &__right {
      background-color: #8bc34a;
      color: #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 60%;
    }
  }

  &__footer {
    display: block;
    font-size: 12px;
    padding: 3px 0;
    text-align: center;
  }

  &__image {
    max-width: 80%;
  }
}
</style>
