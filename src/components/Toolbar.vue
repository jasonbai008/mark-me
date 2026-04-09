<template>
  <div class="gear-wrapper hide">
    <div class="gear" @click="togglePanel">
      <!-- 齿轮图标 -->
      <svg
        t="1699084328443"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2538"
        width="28"
        height="28"
      >
        <path
          d="M709.120628 168.96328c56.214584 33.217708 126.482813 34.495313 183.975001 3.832812 45.99375 51.104167 80.489063 112.429167 102.208334 177.58698-89.432292 56.214584-114.984376 175.031772-58.769792 264.464064 15.33125 24.274479 35.772917 43.438542 58.769792 58.769792-11.498438 33.217708-25.552083 63.880209-42.160938 94.542709-16.608854 29.384896-37.050521 57.492188-60.047396 83.044271-93.265105-48.548959-209.527084-12.776042-258.076043 80.489063-12.776042 25.552083-20.441667 52.381771-21.719271 81.766667a500.820836 500.820836 0 0 1-204.416667 0c-3.832813-106.041146-93.265105-187.807813-198.028647-183.975001-28.107292 1.277604-56.214584 8.943229-81.766667 21.719271-45.99375-51.104167-80.489063-112.429167-102.208334-177.58698C116.312292 617.402344 143.14198 499.86276 86.927396 410.430468c-15.33125-24.274479-35.772917-44.716146-58.769792-60.047396 10.220833-33.217708 24.274479-63.880209 42.160938-93.265104 16.608854-29.384896 37.050521-57.492188 60.047396-84.321876 93.265105 48.548959 209.527084 12.776042 258.076043-80.489063 12.776042-25.552083 20.441667-52.381771 21.719271-81.766667a500.820836 500.820836 0 0 1 204.416667 0c2.555208 66.435417 38.328125 126.482813 94.542709 158.422918z"
          fill="#2F77F1"
          p-id="2539"
        ></path>
        <path
          d="M511.091981 704.279428c-106.041146 0-191.640626-85.59948-191.640625-191.640626s85.59948-191.640626 191.640625-191.640626 191.640626 85.59948 191.640626 191.640626-85.59948 191.640626-191.640626 191.640626z m0-332.177085c-77.933855 0-140.536459 62.602604-140.536459 140.536459s62.602604 140.536459 140.536459 140.536459 140.536459-62.602604 140.536459-140.536459-62.602604-140.536459-140.536459-140.536459z"
          fill="#AFFCFE"
          p-id="2540"
        ></path>
      </svg>
    </div>
    <div class="panel">
      <!-- 工具按钮 -->
      <el-button color="#4999dd" :icon="Link" @click="insertLink"
        >插入链接</el-button
      >
      <el-button color="#4999dd" :icon="Grid" @click="insertTable"
        >插入表格</el-button
      >
      <el-button color="#9B59B6" :icon="Picture" @click="insertImage"
        >插入图片</el-button
      >
      <el-button color="#2C3E50" :icon="EditPen" @click="insertCode"
        >插入代码</el-button
      >
      <el-button type="success" :icon="Download" @click="exportHTML"
        >导出 html</el-button
      >
      <el-button type="primary" :icon="Printer" @click="print"
        >导出 PDF</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  Link,
  Grid,
  Picture,
  EditPen,
  Download,
  Printer,
} from "@element-plus/icons-vue";

export default {
  name: "toolbar",
  components: {},
  props: {},
  data() {
    return {
      Link,
      Grid,
      Picture,
      EditPen,
      Download,
      Printer,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    togglePanel() {
      document.querySelector(".gear-wrapper").classList.toggle("hide");
    },
    print() {
      window.print();
    },
    exportHTML() {
      // 获取预览区域的 HTML 内容
      const content = document.querySelector(".output").innerHTML;

      // 构建完整的 HTML 模板，包含内联样式
      const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MarkMe 导出文档</title>
    <!-- 使用 CDN 样式，减少导出文件的体积 -->
    <link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css">
    <link rel="stylesheet" href="https://unpkg.com/highlight.js/styles/atom-one-dark.css">
    <style>
        /* 基础样式 */
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.5;
            word-wrap: break-word;
        }
        @media (max-width: 767px) {
            body { padding: 15px; }
        }
    </style>
</head>
<body class="markdown-body">
    ${content}
</body>
</html>`;

      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mark-me-${new Date().getTime()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    insertCode() {
      // 插入代码
      let newStr = "```js\nconsole.log('Vue2 is the best framework.')\n```";
      this.$emit("updateContent", this.genNewContent(newStr));
    },
    insertLink() {
      // 插入链接
      let newStr = `[超链接](https://bai-mark.netlify.app)`;
      this.$emit("updateContent", this.genNewContent(newStr));
    },
    insertImage() {
      // 插入图片
      let newStr = `![Image](https://bai-mark.netlify.app/favicon.png)`;
      this.$emit("updateContent", this.genNewContent(newStr));
    },
    insertTable() {
      // 插入表格
      let newStr = `| Item | Link Address |
| :--------:   | :-----  |
| Home Page | [https://jasonbai.dpdns.org](https://jasonbai.dpdns.org) |
| My Blog | [https://blog.jasonbai.dpdns.org](https://blog.jasonbai.dpdns.org) |  `;

      this.$emit("updateContent", this.genNewContent(newStr));
    },
    genNewContent(str) {
      // 获取文本域对象
      let textarea = document.querySelector(".inputArea textarea");
      // 获取光标位置
      let position = textarea.selectionStart;
      let oldStr = textarea.value;
      // 插入字符串
      let resultStr = oldStr.slice(0, position) + str + oldStr.slice(position);
      return resultStr;
    },
  },
  watch: {},
};
</script>

<style scoped lang='scss'>
.gear-wrapper {
  position: fixed;
  top: 50px;
  right: 0px;
  transition: all 0.3s;
  border-bottom-left-radius: 8px;
  box-shadow: -6px 0px 10px #ccc;
  background: #fff;

  &.hide {
    transform: translateX(100%);
  }
}

.gear {
  width: 28px;
  height: 28px;
  padding: 7px 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  position: absolute;
  top: 0;
  left: -48px;
  background: #fff;
  cursor: pointer;
  box-shadow: -6px 0px 10px #ccc;

  svg {
    animation: rotate 2.5s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.panel {
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-bottom-left-radius: 8px;

  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-left: 0;
    width: 100%;
    color: #fff;
    border: none;
    :deep(.el-icon) {
      font-size: 18px;
    }
    /* 解决文字与图标对齐问题 */
    :deep(span) {
      display: inline-flex;
      align-items: center;
      line-height: 1.5;
    }
  }
  .el-button:last-child {
    margin-bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .gear-wrapper {
    display: none;
  }
}
</style>