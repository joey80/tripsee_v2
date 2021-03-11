<template>
  <section>
    <template v-if="isLoading">
      <trip-spinner />
    </template>
    <template v-else-if="placeState.places">
      <trip-title v-bind:cityName="cityName">Places To Eat In</trip-title>
      <swiper :options="swiperOption">
        <swiper-slide v-for="place in placeState.places" :key="place.id">
          <trip-card-section :title="place.name">
            <template slot="cardHeader">
              <div class="places__header__container">
                <div class="places__header__left">
                  <img
                    :src="require(`../../assets/images/yelp/${place.rating}.png`)"
                    class="places__rating"
                  />
                  Based off of {{ place.review_count }} reviews
                </div>
                <div class="places__header__right">
                  <img
                    :src="require('../../assets/images/yelp/logo.png')"
                    class="places__yelp-logo"
                  />
                </div>
              </div>
            </template>
            <template slot="cardContent">
              <trip-image-container :bgImage="place.image_url" />
            </template>
            <template slot="cardFooter">
              Tags:
              <trip-badge v-if="place.categories[0]" className="badge--small">
                {{ place.categories[0].title }}
              </trip-badge>
              <trip-badge v-if="place.categories[1]" className="badge--small">
                {{ place.categories[1].title }}
              </trip-badge>
              <div class="places__address">
                <span class="places__address--small">
                  {{ place.display_phone }}
                </span>
                {{ place.location.display_address[0] }}<br />
                {{ place.location.display_address[1] }}
              </div>
            </template>
          </trip-card-section>
        </swiper-slide>
      </swiper>
    </template>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import CardSection from '../CardSection/CardSection';
import ImageContainer from '../atoms/ImageContainer/ImageContainer.vue';
import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';
import 'swiper/css/swiper.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    tripCardSection: CardSection,
    tripImageContainer: ImageContainer,
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
      placesData: null,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.places {
  &__address {
    margin-top: 20px;

    &--small {
      display: block;
      font-size: 12px;
      font-weight: bold;
      padding-bottom: 10px;
    }
  }
  &__header {
    &__container {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      width: 100%;
    }

    &__left {
      font-size: 12px;
      font-style: italic;
    }
  }

  &__rating {
    display: block;
    max-width: 40%;
    padding-bottom: 10px;
  }

  &__yelp-logo {
    max-width: 80px;
    transform: translateY(-8px);
  }
}
</style>
