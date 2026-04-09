<template>
  <el-input ref="inputRef" v-model="str" type="textarea" class="inputArea" />
</template>

<script setup>
// 引入 ref
import { ref, watch, onMounted } from 'vue'

// 定义组件属性
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// 获取 el-input 实例
const inputRef = ref(null)

// 由于props不能直接修改，所以这里将modelValue赋值给内部的str变量上
const str = ref(props.modelValue)

// 监听内部 str 变化，同步到父组件并缓存
watch(str, (n) => {
  emit('update:modelValue', n)
  localStorage.markMeStr = n
})

// 监听外部 modelValue 变化，同步到内部 str
watch(() => props.modelValue, (n) => {
  str.value = n
})

// 暴露滚动元素
defineExpose({
  getScrollElement: () => inputRef.value?.$el.querySelector('textarea')
})
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