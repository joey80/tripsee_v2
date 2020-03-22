<template>
  <span class="badge" :class="className"><slot /></span>
</template>

<script>
export default {
  props: {
    className: String
  }
};
</script>

<style lang="scss" scoped>
.badge {
  background-color: #323232;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  padding: 4px 12px;
}
</style>
