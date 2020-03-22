<template>
  <section>
    <template v-if="placeState.loading === true">
      <trip-spinner />
    </template>
    <template v-else>
      <trip-title>Places To Eat In</trip-title>
      <swiper :options="swiperOption">
        <swiper-slide v-for="place in placeState.places" :key="place.id">
          <trip-card>
            <template slot="cardHeader">
              {{ place.name }}
            </template>
            <template slot="cardContent">
              {{ place.location.display_address[0] }}<br />
              {{ place.location.display_address[1] }}
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
import Spinner from '../atoms/Spinner/Spinner.vue';
import Card from '../atoms/Card/Card.vue';
import Title from '../atoms/Title/Title.vue';
import 'swiper/css/swiper.css';

export default {
  components: {
    tripCard: Card,
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
}
</style>
