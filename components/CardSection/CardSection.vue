<template>
  <div class="card">
    <div v-if="$slots.cardHeader" class="card__header">
      <a :href="url" target="_blank">
        <span v-if="title" class="card__title">{{ title }}</span>
      </a>
      <slot name="cardHeader" />
    </div>
    <div class="card__content">
      <slot name="cardContent" />
    </div>
    <div v-if="$slots.cardFooter" class="card__footer">
      <slot name="cardFooter" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    url: String,
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 8px 20px -5px rgba(0, 0, 0, 0.2);
  color: #4a4a4a;
  margin: 10px 0 20px 0;
  min-height: 217px;

  a {
    color: currentColor;
    text-decoration: none;
  }

  &__footer {
    padding: 8px;
  }

  &__header {
    padding: 8px;
    font-size: 1.2em;
  }

  &__title {
    display: block;
    font-size: 19px;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
