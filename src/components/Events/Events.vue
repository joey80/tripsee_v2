<template>
  <section>
    <template v-if="eventState.loading === true">
      <trip-spinner />
    </template>
    <template v-else>
      <trip-title>Upcoming Events In</trip-title>
      <swiper :options="swiperOption">
        <swiper-slide v-for="event in eventState.events" :key="event._attributes.id">
          <trip-card :title="trimTitle(event.title._text)">
            <template slot="cardHeader">
              {{ event.venue_name._text }}
            </template>
            <template slot="cardContent">
              <trip-image-container :bgImage="renderBgImage(event)" />
            </template>
            <template slot="cardFooter">
              {{ event.start_time._text }}
              {{ event.description._text }}
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
import ImageContainer from '../atoms/ImageContainer/ImageContainer.vue';
import Spinner from '../atoms/Spinner/Spinner.vue';
import Card from '../atoms/Card/Card.vue';
import Title from '../atoms/Title/Title.vue';
import { LimitTitleLength } from '../../utils/Helpers';
import 'swiper/css/swiper.css';

export default {
  components: {
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
  methods: {
    trimTitle(title) {
      return LimitTitleLength(title);
    },
    renderBgImage(event) {
      return (event.image &&
        event.image.medium &&
        event.image.medium.url &&
        event.image.medium.url._text) !== undefined
        ? event.image.medium.url._text
        : null;
    }
  },
  computed: {
    ...mapState(['eventState'])
  }
};
</script>

<style lang="scss" scoped></style>
