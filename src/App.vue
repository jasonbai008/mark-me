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
  html, body {
    height: auto !important;
    overflow: visible !important;
  }

  #app,
  .mm-wrap,
  .el-row,
  .output {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    position: static !important;
    display: block !important;
  }

  #printArea {
    width: 100% !important;
    max-width: 100% !important;
    flex: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* 隐藏编辑区和工具栏 */
  #editArea,
  .gear-wrapper,
  .el-col:not(#printArea) {
    display: none !important;
  }

  /* 强制打印背景颜色和图片 */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  /* 针对 markdown-body 的打印优化 */
  .markdown-body {
    padding: 20px !important;
    background-color: white !important;
  }

  /* 避免在标题、图片、代码块中间断开 */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }
  
  pre, blockquote, img, tr, li {
    page-break-inside: avoid;
  }
}
</style>