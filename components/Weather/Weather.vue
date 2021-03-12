<template>
  <section>
    <template v-if="isLoading">
      <trip-spinner />
    </template>
    <template v-if="weatherData && !isLoading">
      <trip-title :cityName="cityName">Weather In</trip-title>
      <trip-card-section>
        <template slot="cardContent">
          <div class="weather__content">
            <div class="weather__content__left">
              <img
                :src="require(`~/assets/images/weather/${weatherData.icon}.png`)"
                class="weather__image"
              />
            </div>
            <div class="weather__content__right">
              <span class="weather__temp">{{ Math.floor(weatherData.temp) }}&#176;</span>
              <span class="name"> Currently {{ weatherData.description }} </span>
            </div>
          </div>
        </template>
        <template slot="cardFooter">
          <span class="weather__footer">{{ weatherData.forecast }}</span>
        </template>
      </trip-card-section>
    </template>
  </section>
</template>

<script>
import axios from 'axios';
import CardSection from '../CardSection/CardSection';
import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';

export default {
  components: {
    tripCardSection: CardSection,
    tripSpinner: Spinner,
    tripTitle: Title,
  },
  props: {
    cityName: String,
    location: {
      lat: Number,
      lng: Number,
    },
  },
  data() {
    return {
      isLoading: false,
      weatherData: null,
    };
  },
  watch: {
    location: async function(newVal, oldVal) {
      if (oldVal.lat !== newVal.lat) {
        const { lat, lng } = newVal;
        this.isLoading = true;
        const res = await axios.get(`/weather?lat=${lat}&lng=${lng}`);
        if (res) this.isLoading = false;
        this.weatherData = res.data;
      }
    },
  },
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
      border-top-left-radius: 4px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 5px;
      width: 35%;
    }

    &__right {
      background-color: #8bc34a;
      border-top-right-radius: 4px;
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
