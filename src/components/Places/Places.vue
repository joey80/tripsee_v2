<template>
  <section>
    <template v-if="placeState.loading === true">
      <trip-spinner />
    </template>
    <template v-else>
      <trip-title>Places To Eat In</trip-title>
      <swiper :options="swiperOption">
        <swiper-slide v-for="place in placeState.places" :key="place.id">
          <trip-card :title="place.name">
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
          </trip-card>
        </swiper-slide>
      </swiper>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Badge from '../atoms/Badge/Badge.vue';
import Card from '../atoms/Card/Card.vue';
import ImageContainer from '../atoms/ImageContainer/ImageContainer.vue';
import Spinner from '../atoms/Spinner/Spinner.vue';
import Title from '../atoms/Title/Title.vue';
import 'swiper/css/swiper.css';

export default {
  components: {
    tripBadge: Badge,
    tripCard: Card,
    tripImageContainer: ImageContainer,
    tripSpinner: Spinner,
    tripTitle: Title,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    };
  },
  computed: mapState(['placeState'])
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

    &__right {
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
