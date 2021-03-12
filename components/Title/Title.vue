<template>
  <trip-badge className="title">
    <slot /> <span class="title--primary">{{ cityName }}</span>
  </trip-badge>
</template>

<script>
import Badge from '../Badge/Badge';

export default {
  components: {
    tripBadge: Badge,
  },
  props: {
    cityName: String,
  },
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
