### 简介
本项目使用vite进行构建，基于vue3、vue-router、vuex、element-plus和axios实现，所有的请求数据都使用Mock.js进行模拟。

### 目录结构
```
├── dist                     # 构建相关
├── public                     # 静态资源
│   │── vite.svg               # favicon图标
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── vite.config.js             # vite 配置
└── package.json               # package.json
```

### 安装
```
# 克隆项目
git https://github.com/XgTony/manager.git

# 进入项目目录
cd manager

# 进入项目目录
yarn

# 本地开发 启动项目
yarn dev

# 在线浏览项目
https://xgtony.github.io/manager/
```