<template>
  <span class="badge" :class="className"><slot /></span>
</template>

<script>
export default {
  props: {
    className: String,
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
</style>
