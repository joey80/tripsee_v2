<template>
  <div class="hamburger" @click="handleClick">
    <div />
  </div>
</template>

<script>
export default {
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

<style lang="scss">
.hamburger {
  transform: translate(5px, -15px);
  width: 20px;

  &:hover {
    cursor: pointer;
  }

  &:after,
  &:before,
  & div {
    background-color: #7fa953;
    border-radius: 3px;
    content: '';
    display: block;
    height: 3px;
    margin: 4px 0;
    transition: all 0.2s ease-in-out;
  }
}
</style>
