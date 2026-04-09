<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

/* 设置打印样式 */
@media print {
  #app,
  .mm-wrap,
  .output {
    height: unset !important;
  }

  #printArea {
    width: 100vw !important;
    max-width: unset;
    flex: unset;
  }

  #editArea,
  .gear-wrapper {
    display: none;
  }

}
</style>