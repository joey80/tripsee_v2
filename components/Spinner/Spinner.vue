<template>
  <div class="circle" />
</template>

<style lang="scss">
.circle {
  animation: spin 1s infinite linear;
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top-color: #7fa953;
  border-radius: 100%;
  height: 100px;
  margin: 20px auto;
  width: 100px;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
