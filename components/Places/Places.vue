<template>
  <section class="places">
    <template v-if="isLoading">
      <trip-spinner />
    </template>
    <template v-if="placesData && !isLoading">
      <trip-title :cityName="cityName">Places To Eat In</trip-title>
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="{
            categories,
            display_phone,
            id,
            image_url,
            location,
            name,
            rating,
            review_count,
          } in placesData"
          :key="id"
        >
          <trip-card-section :title="name">
            <template slot="cardHeader">
              <div class="places__header__container">
                <div class="places__header__left">
                  <img
                    :src="require(`~/assets/images/yelp/${rating}.png`)"
                    class="places__rating"
                  />
                  Based off of {{ review_count }} reviews
                </div>
                <div class="places__header__right">
                  <img :src="require('~/assets/images/yelp/logo.png')" class="places__yelp-logo" />
                </div>
              </div>
            </template>
            <template slot="cardContent">
              <trip-image-container :bgImage="image_url" />
            </template>
            <template slot="cardFooter">
              Tags:
              <trip-badge v-if="categories[0]" className="badge--small">
                {{ categories[0].title }}
              </trip-badge>
              <trip-badge v-if="categories[1]" className="badge--small">
                {{ categories[1].title }}
              </trip-badge>
              <div class="places__address">
                <span class="places__address--small">
                  {{ display_phone }}
                </span>
                {{ location.display_address[0] }}<br />
                {{ location.display_address[1] }}
              </div>
            </template>
          </trip-card-section>
        </swiper-slide>
      </swiper>
    </template>
  </section>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Badge from '../Badge/Badge';
import CardSection from '../CardSection/CardSection';
import ImageContainer from '../ImageContainer/ImageContainer';
import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';
import 'swiper/swiper.scss';

export default {
  components: {
    Swiper,
    SwiperSlide,
    tripBadge: Badge,
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
  watch: {
    location: async function(newVal, oldVal) {
      if (oldVal.lat !== newVal.lat) {
        const { lat, lng } = newVal;
        this.isLoading = true;
        const res = await axios.get(`/yelp?lat=${lat}&lng=${lng}`);
        if (res) this.isLoading = false;
        this.placesData = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.places {
  &:hover {
    cursor: pointer;
  }

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