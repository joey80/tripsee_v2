<template>
  <section class="search__container">
    <form v-on:submit.prevent="handleQuery" autocomplete="off">
      <input v-model="query" class="search__input" placeholder="Enter A City Name Or A Zipcode" />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    };
  },
  props: {
    onClick: Function
  },
  methods: {
    handleQuery() {
      return this.$store.commit('searchQuery', this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  &__container {
    margin-top: 10px;

    &::before {
      background-image: url('../../assets/images/search-icon.svg');
      background-size: contain;
      bottom: 35px;
      content: '';
      height: 25px;
      left: 20px;
      position: absolute;
      width: 25px;
      z-index: 2;
    }
  }

  &__input {
    border: 1px solid transparent;
    border-radius: 290486px;
    box-shadow: none;
    color: #322c49;
    font-size: 1.1em;
    min-height: 40px;
    padding: 6px 18px 3px 40px;
    position: relative;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &::placeholder {
      color: rgb(216, 216, 216);
    }

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0px 10px 15px 5px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease-in-out;
    }

    &:focus {
      border: 0;
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
