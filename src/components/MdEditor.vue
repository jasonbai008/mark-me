<template>
  <el-input v-model="str" type="textarea" class="inputArea" />
</template>

<script setup>
// 定义组件属性
const props = defineProps(['inputStr'])

// 由于props不能直接修改，所以这里将inputStr赋值给内部的str变量上
const str = ref(props.inputStr)

// 缓存编辑过程数据
watch(str, (n, o) => localStorage.markMeStr = n)
</script>

<style scoped lang="scss">
.inputArea {
  font-size: 18px;
}

.inputArea::v-deep textarea {
  border-radius: 0;
  height: 100vh !important;
  padding: 20px;
  box-sizing: border-box;
  background: #ECF0F1;
  word-break: break-all;
}

@media screen and (max-width: 768px) {
  .inputArea::v-deep textarea {
    height: 50vh !important;
  }
}
</style>