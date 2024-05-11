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

/* 设置滚动条宽度 */
::-webkit-scrollbar {
  width: 8px;

}

/* 设置滚动条轨道背景色 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 设置滚动条滑块背景色 */
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #01ba95, #3afad3);
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