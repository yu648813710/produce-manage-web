# 木耳 web 项目

---

## 项目信息

```text

  produce-web +   // 公用头部（包含登录）

    git仓库：

    技术栈：vue,vue-cli3,ant-design-vue

    本地端口号：8080

  produce-data-manage-web +   // 数据管理

    git仓库：git@code.aliyun.com:zhashui-muer/produce-data-manage-web.git

    技术栈：vue,vue-cli3,ant-design-vue

    本地端口号：8082

    项目辨识路径：producedatamng

  produce-manage-web + // 生产管理

    git仓库：git@code.aliyun.com:zhashui-muer/produce-manage-web.git

    技术栈：vue,vue-cli3,ant-design-vue

    本地端口号：8081

    项目辨识路径：producemng


```

## 技术实现

- 项目需求

  每个模块需要是独立的，方便业务抽取，但是都需添加公用头部

## 构建模式

- :fn 模式

  - 本地前端用

- :prd 模式

  - 线上打包用

- :test 模式

  - 测试打包用

- 无模式启动

  - 后端测试打包用

## 文件目录

```text

  + public

    - faviconlogo.ico // 浏览器的小icon

    - index.html // 打包后的入口文件

  + src

    - api  // 放置模块的请求方法

      - module.js // 模块的单独放置方法的文件

    - assets // 放置不需要打包的静态文件

    - components // 放置全局的组件

    - config // 全局配置文件夹

    - plugs // 插件文件夹

    + router // 路由配置文件夹

      - routes // 模块路由放置文件夹

      - index.js // 路由使用以及路由权限的处理

      - Route.js // 静态路由以及动态路由的文件

    - store // 状态管理文件夹

    - util // 放置全局的工具类的函数

    + views // 模块页面的放置文件

    - App.vue // 挂载实例以及路由的 页面

    - main.js // 项目的入口 js 文件

  - .browserslistrc // 浏览器的版本文件

  - env.* // 构建模式文件

  - .eslintrc.js // 项目的 eslint 文件

  - .gitignore // git 的忽略文件

  - babel.config.js // babel 的打包配置文件

  - package.json // node 的信息文件，包括启动命令

  - postcss.config.js // 打包 css 文件的配置

  - README.md // 描述文档

  - vue.config.js // vue-cli 的配置文件

  - yarn.lock // 使用yarn安装包的时候自动生产的版本文件

```

## 项目规范

- 代码评审

  - 重注释不重视业务逻辑，业务逻辑由个人负责
  - 两两成小组互相评审，杨金鹏，姜昆。宇文涛，高祥。

- 代码注释

  - 方法需要写使用说明
  - 复杂方法需要写行内注释

- 项目文件规则

  - 文件夹命名 小驼峰
  - 路由命名 全部小写
  - 组件命名 大写开头
  - 公用模块建立在 src 文件下，相关页面模块建立页面文件下

​
