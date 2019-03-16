# app_fenxiaoshang

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```
分销商小程序
1.登录弹窗为单独的组件 loginLayer.vue ，登录接口为单独的js文件 login.js
2.注册时的合作协议页面 reg_agreement.vue
3.注册时填写信息的页面 reg_info.vue
4.注册时订货信息的页面 reg_device.vue
5.注册完成审核页面 reg_audit.vue

6.tabbar资金首页 index.vue
7.物料供应 车主账单详情 orderDet.vue
8.物料供应 分销商账单详情  auditDet.vue

9.tabbar物料页 materiel.vue
10.新发货订单页面 tosendGoods.vue
11.已发货订单页面 sentGoods.vue
12.设备状态(是否激活) isActivate.vue
13.设备详情(已激活) deviceDet.vue
14.物料补充记录 supplyRecord.vue
15.物料补充详情 receiveDet  

16.tabbar审核页面 audit.vue 
17.未审核详情页面 auditDet.vue
18.审核驳回理由页面 reject.vue
17.已审核详情页面 auditDet.vue
18.审核通过选择设备号段 paragraph.vue
19.已审核详情 auditDet.vue

20.tabbar消息页面 message.vue
21.消息详情页面 messageDet.vue
22.通知详情页面 noticeDet.vue

23.tabbar我的页面 my.vue
24.个人信息页面 personalInfo.vue
25.往期收入页面 historyIncome.vue
26.合作协议 
27.服务区域 
28.问题反馈 feedback.vue

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
