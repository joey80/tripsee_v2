<template>
  <div>
    <h1>Hello world!</h1>
    <button v-on:click="handleClick">click me</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    async handleClick() {
      // let res = await axios.get('/google/28031');
      const res = await axios.get('/yelp?lat=35.472468&lng=-80.8875861');
      console.log(res.data);
    },
  },
};
</script>
