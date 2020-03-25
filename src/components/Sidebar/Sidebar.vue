<template>
  <aside :class="{ 'sidebar--open': isOpen }" class="sidebar">
    Coming soon!
  </aside>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #363636;
  color: #fff;
  height: 100vh;
  left: 0;
  padding: 30px;
  position: absolute;
  text-align: right;
  top: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease-in-out;
  width: 100%;
  z-index: 9;

  &--open {
    transform: translateX(-30%);
    transition: all 0.5s ease-in-out;
  }
}
</style>
