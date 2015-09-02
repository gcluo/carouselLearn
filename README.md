# 简单的平面swiper实现

## 开发环境
采用 Nodejs 为基础的 gulp 搭建前端自动化模块，并利用 bower 工具对前端库进行管理，如果从未安装过这两个工具，通过以下命令安装：

* `npm install -g gulp`
* `npm install -g bower`

## gulpfile 主要模块
* `gulp`       —— 项目启动
* `gulp test`  —— 测试网站各 js 文件
* `gulp build` —— 项目编译，完成后在项目根目录下生成 dist 目录，内为_最终文件_


## 项目运行
* `npm install && bower install` （第一次clone需执行）
* `gulp`

如果是手机网站，在浏览器模拟器中，可以从地址 `http://localhost:9000/`进入，项目跟目录下的页面模拟了iOS safari浏览器的状态栏、地址栏和工具栏，是你能够更加清楚的知道网页在浏览器中的页面尺寸。

