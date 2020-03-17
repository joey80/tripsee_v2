<template>
  <div>
    <div class="logo-container">
      <div>
        <div>
          <img src="../../assets/images/logo.png" class="logo" />
        </div>
      </div>
      <span class="icon tripsee-menu" @click="handleClick">
        <i class="fas fa-bars"></i>
      </span>
    </div>
    <div class="circle-container">
      <div class="left-circle"></div>
      <div class="right-circle"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  padding: 10px 20px 0 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 8px dotted #fff;
  margin-bottom: 25px;
}
.logo {
  max-width: 250px;
}
.tripsee-logo {
  font-family: 'Antic Slab', serif;
  font-size: 2.8em;
  color: #7fa953;
}
.tripsee-subtitle {
  transform: translateY(-2px);
  font-family: 'Muli', sans-serif;
  font-size: 0.8em;
  color: #a6a9b9;
  font-weight: bold;
  font-style: italic;
}
.tripsee-menu {
  color: #7fa953;
  font-size: 1.3em;
  cursor: pointer;
  transform: translateY(-15px);
}
.light {
  font-family: 'Muli', sans-serif;
  color: #ade16d;
  font-size: 0.9em;
  letter-spacing: -3px;
}
.circle-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: -55px;
}
.left-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(-40px);
}
.right-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(40px);
}
</style>
