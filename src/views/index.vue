<template>
  <div class='mm-wrap'>
    <el-row>
      <el-col :span="12" :xs="24" id="printArea">
        <MdPreview ref="previewRef" :inputStr="inputStr"></MdPreview>
      </el-col>
      <el-col :span="12" :xs="24" id="editArea">
        <MdEditor ref="editorRef" v-model="inputStr"></MdEditor>
      </el-col>
    </el-row>
    <Toolbar @updateContent="updateContent"></Toolbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MdEditor from '@/components/MdEditor.vue'
import MdPreview from '@/components/MdPreview.vue'
import Toolbar from '@/components/Toolbar.vue'

// 组件引用
const editorRef = ref(null)
const previewRef = ref(null)

// 滚动同步标志位
let isScrollingEditor = false
let isScrollingPreview = false

// 同步滚动逻辑
onMounted(() => {
  const editorEl = editorRef.value.getScrollElement()
  const previewEl = previewRef.value.getScrollElement()

  if (editorEl && previewEl) {
    // 编辑区滚动时同步到预览区
    editorEl.addEventListener('scroll', () => {
      if (isScrollingPreview) return
      isScrollingEditor = true
      
      // 计算滚动百分比
      const scrollHeight = editorEl.scrollHeight - editorEl.clientHeight
      if (scrollHeight > 0) {
        const percentage = editorEl.scrollTop / scrollHeight
        // 同步预览区
        previewEl.scrollTop = percentage * (previewEl.scrollHeight - previewEl.clientHeight)
      }
      
      // 延时重置标志位，防止死循环
      setTimeout(() => { isScrollingEditor = false }, 50)
    })

    // 预览区滚动时同步到编辑区
    previewEl.addEventListener('scroll', () => {
      if (isScrollingEditor) return
      isScrollingPreview = true
      
      // 计算滚动百分比
      const scrollHeight = previewEl.scrollHeight - previewEl.clientHeight
      if (scrollHeight > 0) {
        const percentage = previewEl.scrollTop / scrollHeight
        // 同步编辑区
        editorEl.scrollTop = percentage * (editorEl.scrollHeight - editorEl.clientHeight)
      }
      
      // 延时重置标志位，防止死循环
      setTimeout(() => { isScrollingPreview = false }, 50)
    })
  }
})

let initialStr = `# Welcom to Mark me Down
This editor uses **Github markdown style**.

> All work and no play makes Jack a dull boy

## Tech stacks
- Vue 3.x
- element-plus
- marked.js
- marked-highlight.js
- highlight.js
- github-markdown-css

## Contact me
You can follow me on [Github](https://github.com/JasonBai008), or finding more information on my [Blog](https://blog.jasonbai.dpdns.org).`

// 右侧变量
const inputStr = ref(localStorage.markMeStr || initialStr)

// 动态改变内容
const updateContent = (str) => inputStr.value = str

</script>

<style scoped lang='scss'>
.mm-wrap {
  height: 100vh;

  .el-row {
    height: 100%;
  }
}
</style>