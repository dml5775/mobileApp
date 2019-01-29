# 基于 Webpack4 和 Vue 的多页应用脚手架

## 命令

1. 开发环境
```
npm run dev
```

2. 生产环境打包
```
npm run build
```

3. 生产环境打包并分析打包结果
```
npm run build:report
```

4. 打包后服务器环境预览
```
npm run serve
```

## 文件夹说明

```
│  .babelrc
│  .editorconfig
│  .eslintrc.js
│  .gitignore
│  package-lock.json
│  package.json
│  postcss.config.js
│  README.md
│  webpack.config.js
│
├─build                         —— Webpack 配置文件
│      alias.js
│      bundle.js
│      externals.js
│      loaders.js
│      webpack.config.base.js
│      webpack.config.dev.js
│      webpack.config.prod.js
│
├─doc                           —— 项目文档
│      README.md
│
├─src                           —— 项目源代码
│  ├─assets                     —— 通用的库/图片/样式文件
│  │  ├─image
│  │  ├─fonts
│  │  └─style
│  │          atom.scss
│  │          color.scss
│  │          constant.scss
│  │          func.scss
│  │          icon.scss
│  │          main.scss
│  │
│  ├─component                  —— 组件
│  │  ├─baseline
│  │  │      index.js
│  │  │       style.scss
│  │  │       template.vue
│  │  └─myScroll
│  ├─model                      —— 数据，接口请求
│  │      index.js
│  │
│  ├─page                       —— 页面
│  │  ├─city                    —— 每个页面一个文件夹，文件夹名字为页面名字
│  │  │      index.js
│  │  │      style.scss
│  │  │      template.vue
│  │  │
│  │  ├─...
│  │  └─index
│  │          index.js
│  │          style.scss
│  │          template.vue
│  │
│  ├─shared                     —— 公用配置，如 API，常量等
│  │      api.js
│  │      constant.js
│  │
│  ├─util                       —— 帮助，封装通用的方法
│  │       index.js
│  │       request.js
│  │
│  │
│  └─plugins
│
│
└─template                      —— 项目模板文件
        config.js
        favicon.ico
        index.html
```


