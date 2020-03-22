<template>
  <section>
    <template v-if="weatherState.loading === true">
      <trip-spinner />
    </template>
    <template v-else>
      <trip-card>
        <template slot="cardContent">
          <div class="weather__content">
            <div class="weather__content__left">
              <img
                :src="require(`../../assets/images/weather/${weatherState.weather.icon}.png`)"
                class="weather__image"
              />
            </div>
            <div class="weather__content__right">
              <span class="weather__temp">{{ Math.floor(weatherState.weather.temp) }}&#176;</span>
              <span class="name">
                Currently {{ weatherState.weather.description }}<br />
                in <strong>{{ searchState.location.cityName }}</strong>
              </span>
            </div>
          </div>
        </template>
        <template slot="cardFooter">
          <span class="weather__footer">{{ weatherState.weather.forecast }}</span>
        </template>
      </trip-card>
    </template>
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
  computed: mapState(['weatherState', 'searchState'])
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
      padding: 5px;
      width: 35%;
    }

    &__right {
      background-color: #8bc34a;
      color: #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 65%;
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

  &__temp {
    font-size: 50px;
    font-weight: bold;
  }
}
</style>
