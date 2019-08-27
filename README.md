## 介绍

基于Vue的UI框架

[![Build Status](https://www.travis-ci.org/Naixes/sin-vue.svg?branch=master)](https://www.travis-ci.org/Naixes/sin-vue)

## 开始使用

1. 安装

   `npm --save sin-vue`

2. 引入

   ```js
   import { Button, ButtonGroup, Icon } from 'sin-vue'
   // 样式
   import 'sin-vue/dist/index.css'
   
   export default {
     name: 'app',
     components: {
       's-button': Button,
       's-button-group': ButtonGroup,
       's-icon': Icon
     }
   }
   ```

3. 添加css样式

   ```css
   *,
   *::before,
   *::after {
       box-sizing: border-box;
   }
   html {
       --font-size: 14px ;
   
       --color: #333;
       --border-color: #999;
       --border-hover-color: #666;
   
       --button-height: 32px;
       --button-bgc: #fff;
       --button-radius: 4px;
       --button-active-bgc: #eee;
   }
   ```

## 开发日志

⏰ 07-27~08-02 完成

### 构建项目

创建README

将空目录上传github：

```
git init
git add .
git commit -m "init"
git remote add origin xxx
git push -u origin master
```

在github中新建文件LICENSE，选择一个模板

`npm init`

`npm i vue`

构建.gitignore文件

新建index.html

引入vue（min.js）

### 按钮组件

css变量声明：

```css
:root {
    --变量名: 变量值;
}
div {
    var(变量名)
}
```

#### 使用parcel构建工具

`npm i -D parcel-bundler`

...

运行：`node_modules/bin/parsel --no-cache`，简写`npx parcel`

> 报错：找不到入口，解决：使用 npx parcel index.html 运行

报错：修改vue版本，vue官网有代码

查看兼容性：caniuse.com

git工具：`npm i -g git-open`，命令：`git open `可以直接打开git仓库网页

#### 添加icon

使用iconfont生成图标

icon位置：用css控制，用变量绑定类名，order控制位置，不对齐时加vertical-align:middle

slot不能加class

props的validator可以用来校验参数

### icon组件

给组件添加click事件不起作用，需要在组件内部触发，`this.$emit('click')`

loading

### button-group组件

边框重叠问题：

方法一：只留一个边框，问题：改变颜色时边框不全

方法二：`margin-left: -1px;`hover时改变z-index

防止使用者包裹多余标签：

```js
mounted() {
    for(let node of this.$el.children) {
        if(node.nodeName.toLowerCase !== 'button') {
            console.warn('xxx')
        }
    }
}
```

### 单元测试

chai：断言库

BDD：行为驱动开发

TDD：测试驱动开发

测试组件参数和事件（chai-spies）

#### 自动化测试

##### puppeteer自动化测试

1. 安装 puppeteer

2. 编写test.js

   ```js
   // puppeteer 自动化测试
   const puppeteer = require('puppeteer')
   
   ;(async () => {
       const browser = await puppeteer.launch({headless: false})
       const page = await browser.newPage()
       await page.setRequestInterception(true)
       // 加快页面速度
       page.on('request', request => {
           if (request.resourceType() === 'image')
           request.abort();
           else
           request.continue();
       })
       page.once('load', async () => {
           const errors = await page.evaluate(() => {
           return window.errors || []
           })
           if (errors.length === 0) {
           console.info('没有错误')
           } else {
           console.error('有错误')
           errors.forEach((error) => {
               console.log(error.message)
           })
           }
           await browser.close()
       });
       await page.goto('http://127.0.0.1:1234')
   })()
   ```

3. 添加测试脚本

   `"test": "node ./test.js"`

4. 打包运行程序
5. 运行脚本

优化：自动运行打包好的程序

```js
const puppeteer = require('puppeteer')
const path = require('path')

;(async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', request => {
        if (request.resourceType() === 'image')
        request.abort();
        else
        request.continue();
    })
    page.once('load', async () => {
        const errors = await page.evaluate(() => {
            return window.errors || []
        })

        // if (errors.length === 0) {
        if(errors === undefined){
            console.log('没要找到测试用例')
        }else if (errors.length === 0) {
            console.info('没有错误')
        } else {
            console.error('有错误')
        errors.forEach((error) => {
            console.log(error.message)
        })
        }
        await browser.close()
    });
    // await page.goto('http://127.0.0.1:1234')
    let p = path.join(__dirname, 'dist', 'index.html')
    await page.goto(`file://${p}`)
})()
```

优化：自动打包，创建自己的服务

注意修改脚本：`"test": "parcel build index.html --no-minify --no-cache && node ./test.js"`

&&：表示相继运行，&：表示同时运行

```js
// puppeteer 自动化测试
const puppeteer = require('puppeteer')
// const path = require('path')

const static = require('node-static');
const file = new static.Server('./dist');
const port = process.env.PORT || 8080

// 创建一个服务
const server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
})

// 注意加分号
;(async () => {
    server.listen(port)
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    // 加快页面速度
    page.on('request', request => {
        if (request.resourceType() === 'image')
        request.abort();
        else
        request.continue();
    })
    page.once('load', async () => {
        const errors = await page.evaluate(() => {
            return window.errors || []
        })

        // if (errors.length === 0) {
        if(errors === undefined){
            console.log('没要找到测试用例')
        }else if (errors.length === 0) {
            console.info('没有错误')
        } else {
            console.error('有错误')
        errors.forEach((error) => {
            console.log(error.message)
        })
        }
        await browser.close()
        server.close()
    });
    // await page.goto('http://127.0.0.1:1234')
    // let p = path.join(__dirname, 'dist', 'index.html')
    // await page.goto(`file://${p}`)
    await page.goto(`http://127.0.0.1:${port}`)
})()
```

##### Karma+Mocha自动化测试


Karma：测试运行器，它可以呼起浏览器，加载测试脚本，然后运行测试用例

Mocha：单元测试框架，它可以用来写测试用例BDD

Sinon：spy/stub/mock库，用以辅助测试

1. 安装工具`npm i -D karma karma-chrome-launcher karma-mocha karma-sinon-chai mocha sinon sinon-chai karma-chai karma-chai-spies`

2. 创建karma.conf.js

   ```js
   module.exports = function (config) {
       config.set({
         // base path that will be used to resolve all patterns (eg. files, exclude)
         basePath: '',
         // frameworks to use
         // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         frameworks: ['mocha', 'sinon-chai'],
         client: {
           chai: {
             includeStack: true
           }
         },
         // list of files / patterns to load in the browser
         // 打包后会有css文件  
         files: [
           'dist/**/*.test.js',
           'dist/**/*.test.css'
         ],
         // list of files / patterns to exclude
         exclude: [],
         // preprocess matching files before serving them to the browser
         // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
         preprocessors: {},
         // test results reporter to use
         // possible values: 'dots', 'progress'
         // available reporters: https://npmjs.org/browse/keyword/karma-reporter
         reporters: ['progress'],
         // web server port
         port: 9876,
         // enable / disable colors in the output (reporters and logs)
         colors: true,
         // level of logging
         // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         logLevel: config.LOG_INFO,
         // enable / disable watching file and executing tests whenever any file changes
         autoWatch: true,
         // start these browsers
         // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         // 设置浏览器  
         browsers: ['Chrome'],
         // Continuous Integration mode
         // if true, Karma captures browsers, runs the tests and exits
         singleRun: false,
         // Concurrency level
         // how many browser should be started simultaneous
         concurrency: Infinity
       })
     }
   ```

3. 创建test/button.test.js

4. 创建测试脚本

   ```js
   "dev-test": "parcel watch test/* --no-cache & karma start",
   "test": "parcel build test/* --no-cache --no-minify && karma start --single-run"
   ```

5. 运行测试脚本`npm run test`：打包js（打包会将 js 和 css 分开），打开浏览器，运行测试用例，关闭浏览器，把浏览器输出的内容输出到命令行

出现错误时，尝试删除上次打包和缓存

#### 测试用例

describe+it 用来隔离测试用例，可以起名，BDD

chai：not，deep，own，NaN

#### 持续集成

包括：持续测试，持续交付，持续部署

travisc ci：没有数量限制， circle ci：一个以上收费

##### travisc ci

阮一峰教程：<http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html>

###### 持续测试

1. 创建.travis.yml

2. 注册账户，添加项目，会发送Gmail邮件

报错：改为无头浏览器（没有界面）

### 发布npm

1. 测试通过
2. 代码上传到npmjs.org
   0. 更新 package.json 
      1. 在 package.json 里将版本号为 0.0.1，每次发布要修改
      2. 创建 index.js，在 index.js 里将要导出的内容全部导出
      3. 打包index.js代码
      4. 添加配置 “mian”:“dist/index.js”
   1. 去 https://www.npmjs.com/ 注册一个账户
   2. 确认一下邮箱（必须）
   3. 项目根目录运行 npm adduser
      - 如果错误提示里面含有 https://registry.npm.taobao.org 则说明你的 npm 源目前为淘宝源，需要更换为 npm 官方源

   4. 运行 npm publish
   
3. 使用

   - 使用 vue-cli

     **问题1**：不支持import报错

     解决：用 babel 转译 import

     ```js
     npx parcel build index.js --no-cache --no-minify // 不加no-minify，组件会没有内容，slot被删了
     ```

     修改 main 配置：/dist/index.js

     不能发布同一个版本

     **问题2**：需要手动引入样式，手动写默认样式

   - 使用 webpack

   - 使用 parcel

#### 提高效率

别人通过 npm update xxx 来更新

如果你只是为了本地调试，可以在项目目录使用 npm link，然后在使用之处运行 npm link xxx，就是最新了

### 修改bug

要查看旧代码修改bug时，首先提交代码，然后回到旧版本`git reset --hard xxx`，安装依赖

默认查找index，有index.js文件时，会出错，应该使用index.html

⏰ 08-03~08-14 完成

### input组件

#### 需求分析

- 输入
- 提示
- 报错
- 清空
- 复制粘贴
- tab，回车
- 不可输入

状态：hover，focused，error，error+focus/hover，success，success+focus/hover，disabled，readonly

事件：change，focus，blur，input

#### 书写样式及事件

vue中自定义组件不要自闭合

**scoped**：标签上会加上表示不同组件的属性

区分不同的状态

icon去色

#### 测试

|-| 可以将属性测试封装一下

#### 实现v-model

v-model相当于:value="message" @input="message = $event.target.value"，所以要支持v-model要做到以下两点：

1. 接收value参数

2. 要把值传出去

`@input="$emit('input', $event.target.value, $event)"`

### git的使用

`git log`：log，q退出

`git branch xxx`：新建分支

`git push origin button-and-input:button and input`：将本地分支提交到远程分支

`git checkout button-and-input`：切换到xx分支

### 网格系统

vue 中 template 里不能写 style 标签

scss 中的循环：

```scss
.col {
    // 声明class前缀
    $class-prefix: col-
        
    @for $n from 1 thrsough 24 {
        // .col.col-1...
        &.#{$class-prefix}#{$n} {
        	width: ( $n / 24 ) * 100%;
        }
    }
}

```

响应式网格系统

### 布局

layout中有aside时加class改变方向

关闭边框

动画

### toast

#### 需求

- 弹出
  - 自动关闭
  - 点击关闭
  - 自动关闭
    - 自定义时间
  - 关闭后回调
- 第二次点击
  - 只有一个toast
  - 多个toast

#### 开发

**基本功能**

在原型中直接添加`Vue.prototype.$toast = function() {}`，不推荐，有工程化问题

1. $tosat可能覆盖
2. 需要框架import Vue，可能和用户的名称不一样

需要写成一个插件，让用户自己添加

定义install方法，use使用插件

动态生成实例

**自动关闭**

destroy()不会自动删除元素，需要先$el.remove()

**关闭按钮和关闭后回调**

props的对象要返回函数：对象是引用类型，直接返回可能会相互影响，返回函数避免相互影响

传递DOM元素，默认不支持

min-height会使子元素的100%高度失效

**位置样式**

多行内容的样式

**动画**

解决动画和居中的transform的冲突问题：分成两个元素，或用其他方法居中

**传递html**


**重构**

可以用indexOf()代替includes()，兼容性好一些

**windows的&符号不起作用**

### tabs

#### 需求分析

- 切换tab
- icon
- 横竖
- 附带按钮

#### 开发

结构过于简单的话就不够灵活，根据语义区分结构，可以更加灵活但是代码比较复杂。

根据name对应tab和内容

vue事件不会冒泡 





































