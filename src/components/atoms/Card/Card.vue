<template>
  <div class="card">
    <div class="card-footer">
      <div class="card-footer-item dark">
        <img :src="`../src/assets/weather/'${icon}.png`" />
      </div>
      <div class="card-footer-item light">
        <div class="item-center">
          <span class="temp">{{ temp }}&#176;</span>
          <span class="name"
            >Currently {{ description }}<br />in <strong>{{ name }}</strong></span
          >
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <p class="forecast">{{ forecast }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  }
};
</script>

<style lang="scss" scoped></style>
