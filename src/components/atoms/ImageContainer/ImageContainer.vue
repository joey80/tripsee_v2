<template>
  <div class="image-container">
    <div
      class="image-container__image"
      :style="{ 'background-image': `url(${bgImage || this.placeholder})` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    bgImage: String
  },
  data() {
    return {
      placeholder: 'http://via.placeholder.com/350x350'
    };
  },
  mounted() {
    console.log('bgImage', this.bgImage);
  }
};
</script>

<style lang="scss">
.image-container {
  border-top: 8px solid #5a9216;
  border-bottom: 8px solid #5a9216;
  height: 270px;

  &__image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }
}
</style>
