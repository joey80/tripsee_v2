<template>
    <div class="logo-container navbar is-fixed-top">
        <div class="navbar-item">
                <span class="tripsee-logo">Tripsee</span>
                <span class="tripsee-subtitle">Discover Your Next Favorite Place</span>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .logo-container {
        padding: 10px 0 0 0;
        background-color: #2d324f;
        text-align: center;
    }
    .tripsee-logo {
        font-family: 'Antic Slab', serif;
        font-size: 2em;
        color: #fff;
        display: block;
    }
    .tripsee-subtitle {
        display: inline-block;
        padding-left: 5px;
        transform: translateY(-8px);
        font-family: 'Muli', sans-serif;
        font-size: 0.7em;
        color: #a6a9b9;
        font-weight: bold;
        font-style: italic;
    }
    .tripsee-menu {
        transform: translateY(-50px);
        border: 1px solid #fff;
    }
    .navbar {
        border: 1px solid #fff;
        padding: 0;
    }
</style>