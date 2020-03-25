<template>
  <trip-badge className="title">
    <slot /> <span class="title--primary">{{ searchState.location.cityName }}</span>
  </trip-badge>
</template>

<script>
import { mapState } from 'vuex';
import Badge from '../Badge/Badge.vue';

export default {
  components: {
    tripBadge: Badge
  },
  computed: mapState(['searchState'])
};
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  margin-top: 20px;

  &--primary {
    color: rgb(139, 195, 74);
  }
}
</style>
