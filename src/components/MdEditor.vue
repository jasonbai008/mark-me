<template>
  <div
    class="editor-wrap"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <el-input ref="inputRef" v-model="str" type="textarea" class="inputArea" />
    <div v-show="isDragging" class="drop-overlay">
      <el-icon class="drop-icon"><UploadFilled /></el-icon>
      <p class="drop-hint">释放以导入 .md / .txt</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const str = ref(props.modelValue)
const isDragging = ref(false)
let dragDepth = 0

const ALLOWED_EXT = ['.md', '.txt', '.markdown']

const isAllowedFile = (file) => {
  if (!file) return false
  const name = (file.name || '').toLowerCase()
  return ALLOWED_EXT.some((ext) => name.endsWith(ext))
}

const hasFiles = (e) =>
  Array.from(e.dataTransfer?.types || []).includes('Files')

const onDragEnter = (e) => {
  if (!hasFiles(e)) return
  dragDepth += 1
  isDragging.value = true
}

const onDragOver = (e) => {
  if (!hasFiles(e)) return
  e.dataTransfer.dropEffect = 'copy'
}

const onDragLeave = (e) => {
  if (!hasFiles(e)) return
  dragDepth = Math.max(0, dragDepth - 1)
  if (dragDepth === 0) isDragging.value = false
}

const resetDrag = () => {
  dragDepth = 0
  isDragging.value = false
}

const onDrop = (e) => {
  resetDrag()
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  if (!isAllowedFile(file)) {
    ElMessage.warning('仅支持导入 .md 或 .txt 文件')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    str.value = String(reader.result ?? '')
  }
  reader.onerror = () => {
    ElMessage.error('读取文件失败')
  }
  reader.readAsText(file, 'UTF-8')
}

watch(str, (n) => {
  emit('update:modelValue', n)
  localStorage.markMeStr = n
})

watch(() => props.modelValue, (n) => {
  str.value = n
})

defineExpose({
  getScrollElement: () => inputRef.value?.$el.querySelector('textarea')
})
</script>

<style scoped lang="scss">
.editor-wrap {
  position: relative;
  height: 100%;
}

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

.drop-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: rgba(236, 240, 241, 0.72);
  backdrop-filter: blur(2px);
}

.drop-icon {
  font-size: 72px;
  color: #2f77f1;
  opacity: 0.55;
}

.drop-hint {
  margin: 12px 0 0;
  font-size: 16px;
  color: #2f77f1;
  opacity: 0.7;
}

@media screen and (max-width: 768px) {
  .inputArea::v-deep textarea {
    height: 50vh !important;
  }
}
</style>
