# mark-me

a vue3 starter powered by vite.

## Stack

- vue 3.x
- vue-router 4.x
- pinia 2.x
- pinia-plugin-persistedstate
- element-plus 2.3.12
- axios
- echarts 5.x
- animate.css

## Features

1. 支持 SCSS
2. 支持自动打开浏览器
3. 支持配置环境变量
4. 支持开发环境请求代理
5. 支持 element-plus 自定义主题色
6. 支持自动引入 vue 模块 【借助插件：unplugin-auto-import/vite】
7. 封装了自适应 echarts 图表组件
8. 支持全局状态持久化【默认未开启】

## How to Use

```sh
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

# build for production with minification
npm run build

# Preview builded page
npm run preview
```

## Documentations

- [Vite Documentation](https://vitejs.dev/guide/)
- [Vue3 Documentation](https://v3.vuejs.org/)
- [Vue-Router4 Documentation](https://next.router.vuejs.org/guide/)
- [Pinia Documentation](https://pinia.vuejs.org/zh/introduction.html)
- [pinia-plugin-persistedstate Documentation](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)
- [Element-Plus Documentation](https://element-plus.org/#/zh-CN/component/installation)

## Notes

1. 部署前需要根据部署路径，修改 vite.config.js 中的 build.base 字段，默认是 '/'
