<template>
  <section class="search__container">
    <form v-on:submit.prevent="logQuery" autocomplete="off">
      <input v-model="query" class="search__input" placeholder="Enter A City Name Or A Zipcode" />
      <!-- possible psuedo selector -->
      <span class="search__icon" />
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    onClick: Function
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.search {
  &__container {
    margin-top: 10px;
  }

  &__icon {
    transition: all 0.4s ease-in-out;
  }

  &__input {
    border: 1px solid transparent;
    border-radius: 290486px;
    box-shadow: none;
    color: #322c49;
    font-size: 1.1em;
    padding: 6px 18px 3px 40px;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 10px 15px 5px rgba(0, 0, 0, 0.05);
    }

    &:focus {
      border: 0;
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
