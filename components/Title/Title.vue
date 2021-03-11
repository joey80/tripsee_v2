<template>
  <span className="badge title">
    <slot /> <span class="title--primary">{{ cityName }}</span>
  </span>
</template>

<script>
export default {
  props: {
    cityName: String,
  },
};
</script>

<style lang="scss" scoped>
.badge {
  background-color: #323232;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  margin-right: 5px;
  padding: 4px 12px;

  &--small {
    font-size: 11px;
    padding: 4px 10px;
  }
}

.title {
  display: inline-block;
  margin-top: 20px;

  &--primary {
    color: rgb(139, 195, 74);
  }
}
</style>
