<template>
  <header>
    <div class="logo-container">
      <img src="~/assets/images/logo.png" alt="tripsee" class="logo" />
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  max-width: 250px;
}

.logo-container {
  align-items: center;
  border-bottom: 8px dotted #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 10px 20px 0 20px;
  position: relative;

  &:after {
    background: #fff;
    border-radius: 50%;
    bottom: -28px;
    content: '';
    height: 50px;
    position: absolute;
    right: -40px;
    width: 50px;
  }

  &:before {
    background: #fff;
    border-radius: 50%;
    bottom: -28px;
    content: '';
    height: 50px;
    left: -40px;
    position: absolute;
    width: 50px;
  }
}
</style>
