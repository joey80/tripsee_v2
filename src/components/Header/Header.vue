<template>
  <header>
    <div class="logo-container">
      <trip-logo />
      <trip-burger :onClick="handleClick" />
    </div>
  </header>
</template>

<script>
import Hamburger from '../atoms/Hamburger/Hamburger.vue';
import Logo from '../atoms/Logo/Logo.vue';

export default {
  components: {
    tripBurger: Hamburger,
    tripLogo: Logo
  },
  props: {
    onClick: Function
  },
  methods: {
    handleClick() {
      return this.onClick();
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-container {
  align-items: center;
  border-bottom: 8px dotted #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 10px 20px 0 20px;
  position: relative;

  &:after {
    background: #fff;
    border-radius: 50%;
    bottom: -28px;
    content: '';
    height: 50px;
    position: absolute;
    right: -40px;
    width: 50px;
  }

  &:before {
    background: #fff;
    border-radius: 50%;
    bottom: -28px;
    content: '';
    height: 50px;
    left: -40px;
    position: absolute;
    width: 50px;
  }
}
</style>
