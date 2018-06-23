<template>
    <div class="logo-container navbar is-fixed-top">
        <div class="navbar-item">
            <div>
                <span class="tripsee-logo">Trip</span><span class="regular">see</span>
                <span class="tripsee-subtitle">Discover Your Next Favorite Place</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .logo-container {
        background-color: #2d324f;
        text-align: center;
        justify-content: center;
    }
    .tripsee-logo {
        font-family: 'Antic Slab', serif;
        font-size: 1.8em;
        color: #fff;
        display: inline-block;
    }
    .tripsee-subtitle {
        display: block;
        padding-left: 5px;
        transform: translateY(-2px);
        font-family: 'Muli', sans-serif;
        font-size: 0.6em;
        color: #a6a9b9;
        font-weight: bold;
        font-style: italic;
    }
    .tripsee-menu {
        transform: translateY(-50px);
    }
    .navbar {
        padding: 0;
    }
    .regular {
        font-family: 'Muli', sans-serif;
        color: #ff4f3e;
        font-size: 1.7em;
    }
</style>