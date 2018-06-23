<template>
    <nav class="logo-container navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="tripsee-logo">
        trip<span class="regular">see</span>
    </div>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>
</template>

<script>
export default {
}
</script>

<style scoped>
    .logo-container {
        background-color: #2d324f;
    }
    .tripsee-logo {
        font-family: 'Antic Slab', serif;
        font-size: 2.5em;
        color: #fff;
        padding-left: 20px;
    }
    .tripsee-subtitle {
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
    .regular {
        font-family: 'Muli', sans-serif;
        color: #ff4f3e;
        font-size: 0.9em;
    }
    .navbar-burger {
        color: #ff4f3e;
    }
</style>