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

/* 设置滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 设置滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent;
}

/* 设置滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #01ba95 0%, #3afad3 100%);
  border-radius: 10px;
}

/* 设置滚动条滑块悬停 */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #009b7c 0%, #2eddc1 100%);
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