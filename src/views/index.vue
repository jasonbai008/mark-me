<template>
  <div class='mm-wrap'>
    <el-row>
      <el-col :span="12" :xs="24" id="printArea">
        <MdPreview :inputStr="inputStr"></MdPreview>
      </el-col>
      <el-col :span="12" :xs="24" id="editArea">
        <MdEditor v-model="inputStr"></MdEditor>
      </el-col>
    </el-row>
    <Toolbar @updateContent="updateContent"></Toolbar>
  </div>
</template>

<script setup>
import MdEditor from '@/components/MdEditor.vue'
import MdPreview from '@/components/MdPreview.vue'
import Toolbar from '@/components/Toolbar.vue'

let initialStr = `# Welcom to Mark me Down
This editor uses **Github markdown style**.

> All work and no play makes Jack a dull boy

## Tech stacks
- Vue 3.x
- element-plus
- marked.js
- github-markdown-css

## Contact me
You can follow me on [Gitee](https://gitee.com/lubanseven) or [Github](https://github.com/JasonBai007), or finding more information on my [Blog](https://jasonbai007.github.io/).`

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