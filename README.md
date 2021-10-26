# vue3中台框架搭建

## 一、起步

+ 安装脚手架 npm install -g @vue/cli

+ 创建项目 vue create my-project

+ 安装项目依赖 npm i element-ui axios mockjs

## 二、配置http请求

+ axios的请求，响应拦截（配置header头加密，数据跟踪，响应数据格式，异常处理等）

+ 配置.env环境变量，（.env不上传git,服务端通过Apollo进行配置线上的环境变量）

+ 创建api接口文件，按功能模块进行文件命名（一般以后端模块进行分类命名 user.js,order.js）

+ 配置mock.js 