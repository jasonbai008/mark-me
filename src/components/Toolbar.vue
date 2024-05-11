<template>
    <div class="gear-wrapper hide">
        <div class="gear" @click="togglePanel">
            <!-- 齿轮图标 -->
            <svg t="1699084328443" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2538" width="28" height="28">
                <path
                    d="M709.120628 168.96328c56.214584 33.217708 126.482813 34.495313 183.975001 3.832812 45.99375 51.104167 80.489063 112.429167 102.208334 177.58698-89.432292 56.214584-114.984376 175.031772-58.769792 264.464064 15.33125 24.274479 35.772917 43.438542 58.769792 58.769792-11.498438 33.217708-25.552083 63.880209-42.160938 94.542709-16.608854 29.384896-37.050521 57.492188-60.047396 83.044271-93.265105-48.548959-209.527084-12.776042-258.076043 80.489063-12.776042 25.552083-20.441667 52.381771-21.719271 81.766667a500.820836 500.820836 0 0 1-204.416667 0c-3.832813-106.041146-93.265105-187.807813-198.028647-183.975001-28.107292 1.277604-56.214584 8.943229-81.766667 21.719271-45.99375-51.104167-80.489063-112.429167-102.208334-177.58698C116.312292 617.402344 143.14198 499.86276 86.927396 410.430468c-15.33125-24.274479-35.772917-44.716146-58.769792-60.047396 10.220833-33.217708 24.274479-63.880209 42.160938-93.265104 16.608854-29.384896 37.050521-57.492188 60.047396-84.321876 93.265105 48.548959 209.527084 12.776042 258.076043-80.489063 12.776042-25.552083 20.441667-52.381771 21.719271-81.766667a500.820836 500.820836 0 0 1 204.416667 0c2.555208 66.435417 38.328125 126.482813 94.542709 158.422918z"
                    fill="#2F77F1" p-id="2539"></path>
                <path
                    d="M511.091981 704.279428c-106.041146 0-191.640626-85.59948-191.640625-191.640626s85.59948-191.640626 191.640625-191.640626 191.640626 85.59948 191.640626 191.640626-85.59948 191.640626-191.640626 191.640626z m0-332.177085c-77.933855 0-140.536459 62.602604-140.536459 140.536459s62.602604 140.536459 140.536459 140.536459 140.536459-62.602604 140.536459-140.536459-62.602604-140.536459-140.536459-140.536459z"
                    fill="#AFFCFE" p-id="2540"></path>
            </svg>
        </div>
        <div class="panel">
            <!-- 工具按钮 -->
            <el-button type="primary" @click="print">导出 PDF</el-button>
            <el-button color="#4999dd" @click="insertTable">插入表格</el-button>
            <el-button color="#9B59B6" @click="insertImage">插入图片</el-button>
            <el-button color="#2C3E50" @click="insertCode">插入代码</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toolbar',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    mounted() { },
    methods: {
        togglePanel() {
            document.querySelector('.gear-wrapper').classList.toggle('hide')
        },
        print() {
            window.print()
        },
        insertCode() {
            // 插入代码
            let newStr = "```js\nconsole.log('Vue2 is the best framework.')\n```";
            this.$emit('updateContent', this.genNewContent(newStr))
        },
        insertImage() {
            // 插入图片
            let newStr = `![Image](https://foruda.gitee.com/avatar/1677006650450442232/2155599_lubanseven_1614389228.png!avatar200)`;
            this.$emit('updateContent', this.genNewContent(newStr))
        },
        insertTable() {
            // 插入表格
            let newStr = `| Item | Link Address |
| :--------:   | :-----  |
| Home Page | [https://lubanseven.gitee.io](https://lubanseven.gitee.io) |
| My Blog | [https://jasonbai007.github.io](https://jasonbai007.github.io) |`;

            this.$emit('updateContent', this.genNewContent(newStr))
        },
        genNewContent(str) {
            // 获取文本域对象
            let textarea = document.querySelector('.inputArea textarea');
            // 获取光标位置
            let position = textarea.selectionStart;
            let oldStr = textarea.value;
            // 插入字符串
            let resultStr = oldStr.slice(0, position) + str + oldStr.slice(position);
            return resultStr
        }
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
    width: 112px;
    height: 180px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-bottom-left-radius: 8px;

    .el-button {
        display: block;
        margin-bottom: 10px;
        margin-left: 0;
        width: 100%;
        color: #fff;
    }
}

@media screen and (max-width: 768px) {
    .gear-wrapper {
        display: none;
    }
}
</style>