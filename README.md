# react-antd-admin-wpk
> 基于React18+React-Router6+Antd+Mobox6的js版本后台管理系统

## [在线预览](https://wangjiahui11.github.io/react-antd-admin-wpk/#/login)

## 功能

- 登录/注销
- 动态侧边栏
  - 支持多级嵌套路由
  - 自适应收缩侧边栏
  - 根据权限动态显示
- 动态面包屑
- Axios再封装
  - 实例配置
  - 请求&响应拦截
  - 全局网络状态码处理
- 鉴权组件：未登录的用户无法进入该组件
- 权限组件：没有权限的角色无法进入该组件
- 懒加载组件
- less&sass适配
- 404页面
- Proxy代理配置解决跨域

## 技术栈

- `React@18 Hooks` 基于 React 最新版本，全面拥抱Hooks
- `React-Router@6.x` 只需配置路由表即可自动生成
- `Antd@4.23.x`6 国内最火的React-CSS库
- `Mobx@6.x` 全局状态管理，语法简单，功能强大，完虐dva, 5分钟轻松入手
- `ECharts@5.x` 前端必备的数据可视化库
- `Axios@0.27.x` 基于Promise封装的网络请求库，99%的前端用了都说好
- `Less&Sass` 提供更加强大的语法

## 目录结构

```
├─ public                     # 静态资源
│   ├─ favicon.ico            # favicon图标
│   └─ index.html             # html模板
├─ src                        # 项目源代码
│   ├─ assets                 # 图片 字体等静态资源
│   ├─ components             # 全局公用组件
│   ├─ pages                  # 路由组件
│   ├─ service                # 所有网络请求
│   ├─ store                  # 全局状态管理
│   ├─ utils                  # 全局公用方法
|   ├─ App.css                # 入口页面样式
│   ├─ App.jsx                # 入口页面
|   ├─ index.css              # 全局样式文件
|   ├─ index.js               # 源码入口
|   ├─ router.js               # 路由表配置文件
|   └─ setupProxy.js          # 代理配置
└── package.json              # package.json
```

## **约定式提交**

- build/chore👷‍♀️: 用于构建系统（包括脚本、配置或工具）和依赖的变化。
- ci: 用于系统持续集成、持续部署相关的配置文件、脚本文件、配置或者工具。
- docs📝: 用于标识项目相关文档的更改。
- feat✨: 用于标识新功能。
- fix🐛: 用于标识bug修复。
- perf⚡️: 用于标识性能提升。
- refactor: 用于标识代码重构，既不添加新功能也不修复错误--例如删除冗余代码、简化代码、重命名变量等。
- style: 用于标记代码格式化，代码风格调制，修复checkstyle等问题。
- tets: 用于标记测试相关的更改，修改现有测试或添加新的测试。
- revert: 用户分支回滚。

## 安装&启动

  进入目录
  1. cd react-template-cli
    安装依赖
  2. npm install    ||   yarn install
    启动
  3. npm run start  ||   yarn start