# react-admin-demo

React 后台管理的项目模板，包含了一个简单的 Nodejs 后台 server

## Features

- 包含一个简单的 Nodejs server，使用了 [koa2](https://github.com/koajs/koa).
- 国际化多语言支持（中文，English，日文...），使用了 [react-intl-universal](https://github.com/alibaba/react-intl-universal).
- UI 使用了 [MATERIAL-UI](https://material-ui.com/)，支持换皮肤，白天和黑夜模式.
- CSS 扩展语言 使用了 [SASS](https://sass-lang.com/) .
- 支持文件上传，头像上传.
- 前端数据存储在 LocalStorage 和 SessionStorage.
- 后端服务器使用了 [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) 数据库.

# 安装与启动

## 安装

在项目根目录输入：

```shell
yarn
```

## 启动后端 Nodejs 服务器

```shell
yarn server-dev
```

## 启动前端 React 应用

```shell
yarn start
```

## 运行前端测试

```shell
yarn test
```

## 运行后端 server 测试

```shell
yarn server-test
```

# 运行截图

![Image text](https://github.com/joeyhu/react-admin-demo/blob/master/public/images/demo/dark_demo.jpg)

![Image text](https://github.com/joeyhu/react-admin-demo/blob/master/public/images/demo/light_demo.jpg)

# 用到的技术

- react ^16.11.0",
- react-chartjs-2 ^2.8.0",
- react-dom ^16.11.0",
- react-intl-universal ^2.2.1",
- react-perfect-scrollbar ^1.5.3",
- react-redux ^7.1.3",
- react-router ^5.1.2",
- react-router-dom ^5.1.2",
- react-scripts 3.2.0",
- redux ^4.0.4",
- redux-logger ^3.0.6",
- redux-thunk ^2.3.0",
- material-ui 4.6.0
- axios 0.19.0
- better-sqlite3 5.4.3
- @material-ui/styles ^4.6.0",
- axios ^0.19.0",
- better-sqlite3 ^5.4.3",
- chart.js ^2.9.3",
- clsx ^1.0.4",
- history ^4.10.1",
- memory-cache ^0.2.0",
- moment ^2.24.0",
- node-sass ^4.13.0",
- prop-types ^15.7.2",

# Todo List

- ~~仪表盘~~
- ~~国际化~~
- ~~换皮肤，黑夜白天模式~~
- ~~添加用户~~
- ~~删除用户~~
- ~~修改密码移到个人资料~~
- ~~修改密码~~
- ~~上傳文件~~
- 产品管理
- 上传文件时添加进度条
- 头像上传后切图
- 操作 API 管理功能

## License

This software is free to use under the MIT license.
