<template>
  <!-- 添加markdown-body，这个div就被github-markdown-css接管了 -->
  <div class="output markdown-body" v-html="output"></div>
</template>

<script setup>
import { marked } from 'marked'

// 接收字符串
const props = defineProps(['inputStr'])
// 加工字符串
const output = computed(() => marked(props.inputStr))

</script>

<style scoped lang="scss">
.output {
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .output {
    height: 50vh;
  }
}
</style>