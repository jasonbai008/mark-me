<template>
  <div class="preview-wrap">
    <!-- AI 转换中：居中圆圈 loading + 实际调用的 Gemini 模型提示 -->
    <div v-show="loading" class="preview-loading">
      <span class="spinner"></span>
      <p class="preview-loading-text">谷歌 Gemini gemini-3.5-flash-lite 正在生成中</p>
    </div>
    <!-- 添加markdown-body，这个div就被github-markdown-css接管了 -->
    <div ref="previewRef" class="output markdown-body" v-html="output"></div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import 'highlight.js/styles/atom-one-dark.css' // 引入高亮样式
import { ref, computed } from 'vue'

// 配置 marked
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

// 接收字符串；loading 由「改成 MD」流式生成时控制
const props = defineProps(['inputStr', 'loading'])
// 加工字符串
const output = computed(() => marked.parse(props.inputStr || ''))

// 获取容器实例
const previewRef = ref(null)

// 暴露滚动元素
defineExpose({
  getScrollElement: () => previewRef.value
})
</script>

<style scoped lang="scss">
.preview-wrap {
  position: relative;
  height: 100%;
}

.preview-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  pointer-events: none;
}

.spinner {
  display: block;
  width: 36px;
  height: 36px;
  border: 3px solid rgba(64, 158, 255, 0.25);
  border-top-color: #409eff;
  border-radius: 50%;
  animation: preview-spin 0.8s linear infinite;
}

.preview-loading-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #909399;
}

@keyframes preview-spin {
  to {
    transform: rotate(360deg);
  }
}

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