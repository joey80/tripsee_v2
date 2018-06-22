<template>
    <div class="logo-container">
        <p class="title is-1 tripsee-logo"><span class="dark-green">Trip</span><span class="light-green">see</span></p>
        <span class="subtitle is-5 tripsee-subtitle">Discover Your Next Favorite Place</span>
        <!-- <p class="subtitle is-4">Discover The World</p> -->
        <!-- <router-link to="/">Home</router-link> | <router-link to="/weather">Weather</router-link> | <router-link to="/places">Places</router-link> | <router-link to="/events">Events</router-link> -->
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .logo-container {
        padding: 30px 30px 0 10px;
    }
    .tripsee-logo {
        font-family: 'Antic Slab', serif;
    }
    .tripsee-subtitle {
        display: inline-block;
        padding-left: 5px;
        transform: translateY(-20px);
        font-family: 'Muli', sans-serif;
        font-size: 0.8em;
    }
    .dark-green {
        color: #124c14;
    }
    .light-green {
        color: #5abb5d;
    }
</style>