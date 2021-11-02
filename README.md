## 介绍

基于Vue的UI框架，本项目已经迁移至https://github.com/Naixes/sin-vue

技术栈：vue-cli+sass+travis ci+vuepress

Travis：![Build Status](README.assets/sin-vue-20211102184605340-5850635.svg)

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

⏰ 08-14~08-30 完成

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

### popover

#### 需求

- 激活
- 嵌套信息

#### 开发

**点击外部关闭**

1. 点击后立即关闭，nextTick

2. 监听body范围太小，监听document
3. 第三次点击点击后立即关闭，因为每次点击都会新增监听器，新增前关闭之前的监听器，注意bind会生成一个新的函数

⏰ 08-31~09-05 完成

不能使用.stop，会影响用户的事件

优化代码：一个方法最好不要超过五行 

**样式**

三角，阴影问题（filter:drop-shadow）

最大宽度

一个很长的单词不会换行

**表驱动编程**

多个并排判断，逻辑相似

**两种触发方式**

hover，click：js动态绑定事件，手动添加的事件，需要手动移除

### 手风琴

保持单个选中

单向数据流实现single

### 总结

1. 单元测试是重构的前提

2. 工具以使用为主

3. 发布订阅模式：enventBus，中心化的事件处理
4. 单向数据流：collapse中用到，让数据处理变得简单
5. 正交：props中的参数没有交叉的部分，不会相互影响
6. 可测试的代码
7. 较强的可读性
8. 面向离职写代码：统一的代码习惯
   - 文档化
   - 严格要求，会有人看写过的代码
   - 有产出

### 官网

#### vuepress

##### 安装vuepress

创建docs文件夹，和README.md

```bash
npx vuepress dev docs
```

##### 增加脚本

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

##### 配置

创建配置文件：`.vuepress/config.js`

```js
// 一个 VuePress 网站必要的配置文件是 .vuepress/config.js，它应该导出一个 JavaScript 对象
module.exports = {
    title: 'Sin Vue UI',
    description: 'Vue 的 UI 框架',
    themeConfig: {
        // 显示所有页面的标题链接
        // displayAllHeaders: true, // 默认值：false
        // 导航栏，可以下拉，可以禁用
        nav: [
            { text: '主页', link: '/' },
            { text: '文档', link: '/' },
            { text: '交流', link: '/' }
        ],
        // 侧边栏
        sidebar: [
            // 分组
            {
                title: '快速入门',
                // 展开
                collapsable: false,
                children: [
                    // 显示的md路径
                    '/install/',
                    '/get-start/',
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/button',
                    '/components/input',
                    '/components/icon',
                    '/components/grid',
                    '/components/layout',
                    '/components/tabs',
                    '/components/popover',
                    '/components/collapse',
                    '/components/cascader',
                ]
            },
        ]
    }
  }
```

```js
// md文件中最前面写以下内容表示在侧边栏显示的标题
---
title: 快速上手
--- 
```

##### 在md中使用vue组件

创建`.vuepress/components`文件夹，将组件放进去：所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件

安装`sass-loader,node-sass`

**浏览器的 API 访问限制**

```html
<ClientOnly>
  <button-demo></button-demo>
</ClientOnly>
```

##### 打包部署

`npm run docs:build`打包

**部署到GitHub Pages**

1. 在 `docs/.vuepress/config.js` 中设置 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 创建一个如下的 `deploy.sh` 文件（自行去掉注释）:

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

3. 非windows用户要改变可执行权限

   `chmod +x deploy.sh `

4. 执行这个文件

5. 选择要部署的分支

遇到问题：

执行：`git push -f git@github.com:Naixes/sin-vue.git master:gh-pages`时报错

```cmd
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

原因是因为ssh key过期失效或者没有ssh key。 那么解决这种的问题的方法就是重新生成一个新的ssh key ，然后将这个ssh key添加到github账户上面，就可以了。参考下文

<https://www.jianshu.com/p/eb742fe78b93>

### 级联选择

手机页面的非级联地区案例：美团，i.meituan.com，房天下， m.fang.com

#### 需求分析

- 点选弹出，点击父级和点击子级
  - 动态弹出
- 键盘操作，方向键
- 清空
- 禁用选项
- 搜索

⏰

#### 开发

##### 将parcel迁移到vue-cli

![1. 文章 如何从 parcel 迁移到 vue-cli](E:\Jennifer\other\sin-vue\media4readme\1. 文章 如何从 parcel 迁移到 vue-cli.png)

##### 单向数据流简化操作

##### 改为动态获取数据

遍历递归查找当前项为其添加子元素

###### 总结

**组件及参数传递**

demo：
	组件参数
	selected：当前选择数据，用来显示选择结果，初始：[]
 	source：源数据，用来显示列表，初始：[]
 	loadSource：查询数据的方法，根据parent_id

cascadere：
	props
	selected：
		updateSelected：定义selected的更新方法
	source：
	loadSource：
	height：弹出框高度

​	computed
​	result：显示选择结果
item：
​	props
​	selected：
​		updateSelected：定义selected的更新方法
​	sourceItem：source
​	loadSource：
​	height：
​	level：当前层级

​    computed
​	rightItem：传递给下一层的数据源，根据sourceItem得出

​    methods
​    select：点击时触发更新selected

**数据流**

初始化：【demo】-created()：loadSource()获取第一层sourse数据向下传递，selected：[]

选择第一层：【item】-**select()**：根据level获得新的**selected**，通知上级（cascader层）更新selected触发了**updateSelected方法**（查询下级数据**children**添加到**source**）继续通知上级更新selected，上级（demo层）更新了selected

​									-**rightItem**：根据source自动计算出右边的source并传递

​					  【cascader】-**result**：计算出当前结果显示到指定位置

##### 点击外部关闭弹窗

分别封装open和close，同时添加事件监控是否点击了外部

```js
onclickDocument(e) {
    console.log('onclickDocument')
    let {cascader} = this.$refs
    let {target} = e
    if(cascader === target || cascader.contains(target)) {
        return
    }
    this.close()
},
open() {
    this.popVisible = true
    document.addEventListener('click', this.onclickDocument)
    // 不知道有啥用
    // this.$nextTick(() => {
    //     document.addEventListener('click', this.onclickDocument)
    // })
},
close() {
    this.popVisible = false
    document.removeEventListener('click', this.onclickDocument)
},
toggle() {
    if(this.popVisible) {
       this.close()
    }else {
       this.open()
    }
},
```

改为封装指令click-outside

指令的常见用法就是封装dom操作

```js
export default {
    inserted(el, bindings) {
        el.onclickDocument = e => {
            // console.log('onclickDocument')
            let {target} = e
            if(el === target || el.contains(target)) {
                return
            }
            // console.log('bindings', bindings)
            bindings.value()
        }
        document.addEventListener('click', el.onclickDocument)
    },
    unbind(el) {        
        document.removeEventListener('click', el.onclickDocument)
    }
}
```

##### 懒加载效果

同时点击多个时，数据可能会出现错乱

#### 单元测试

由于修改了package.json，之前的单元测试会报错

创建一个新项目，npm run test:unit

模仿新项目编写测试，修改svgjs文件，开启watch模式（--watch）

安装sinon-chai和sinon，vue test utils的使用

测试css放弃，暂时使用xit标记

slot的测试方式，nextTick的测试方式

修改持续集成：增加默认的test命令

### slides

#### 动画

##### transition

过渡

transition标签设置动画名（默认v），css过渡类名（六个），设置初始值

```vue
<!-- 使用 transition 将需要过渡的元素包裹起来，name是类名的前缀，没有时是v- -->
<transition name="fade">
    <div v-show="show1" class="box1">动画</div>
</transition>

<tyle>
    /* 定义进入和离开时候的过渡状态 */
    .fade-enter-active,
    .fade-leave-active {
        transition: all 5s;
    }

    /* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
    .fade-enter,
    .fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
<tyle>
```

当插入或删除包含在 `transition` 组件中的元素时，Vue 将会做以下处理：

1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 [JavaScript 钩子函数](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)，这些钩子函数将在恰当的时机被调用。
3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 `nextTick` 概念不同)

插入类名的顺序：enter/enter-active---enter-active/enter-to---空

可以自定义过渡类名，他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

```vue
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

##### animation

动画：CSS 动画用法同 CSS 过渡，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

```css
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

##### 库

animate

##### js钩子

```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

可以结合 CSS `transitions/animations` 使用，也可以单独使用。

velocity（js动画库）

```vue
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>


new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```

**可以通过 `appear` attribute 设置节点在初始渲染的过渡**

##### 多元素过渡

key

过渡模式：mode

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

##### 多组件过渡

is动态组件

##### 列表过渡

`<transition-group>`

- 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` attribute 更换为其他元素。
- [过渡模式](https://cn.vuejs.org/v2/guide/transitions.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 `key` attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 **v-move class**，它会在元素的改变定位的过程中应用。内部的实现，Vue 使用了一个叫 [FLIP](https://aerotwist.com/blog/flip-your-animations/) 简单的动画队列使用 transforms 将元素从之前的位置平滑过渡新的位置。

```css
/* 列表动画 */
.list-enter-active,
.list-leave-active {
    transition: all .5s ease;
}
.list-leave-active {
    /* -leave-active可以改变定位与-move结合使用 */
    /* 可以让过渡更加平滑 */
    position: absolute;
}
.list-move {
    transition: all .5s ease;
}
.list-enter,
.list-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
```

需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline` 。作为替代方案，可以设置为 `display: inline-block` 或者放置于 flex 中

##### 其他

复用过渡，动态过渡，状态过渡

### Nav

### Karma测试

### 表单验证

### 分页

### Table

### Upload

#### 需求分析

##### 流程

尽量避免前端压缩文件

默认头像

点击上传（自动上传），手机：拍照/相册，电脑：选择文件

确定，开始上传，post

响应一个连接url，放入隐藏input

预览

保存

##### 需求

自动上传

列表，进度（真：从服务器获取且浏览器支持/假），删除，提示

拖拽

手动上传，先选择后上传

头像上传

#### 接口设计

action

#### ajax实现文件上传

通过formData收集文件，上传到服务器，上传完成后将图片src设置为返回的url

后台实现上传接口和预览接口

##### 使用heroku

提供一个服务器

注册（fq），创建项目，上传/关联代码，部署（从环境中获取端口号，添加start命令）

##### 后台

```js
const express = require('express')
const multer = require('multer')
const cors = require('cors')

// 插件，获取上传的文件放到uploads中
const upload = multer({dest: 'uploads/'})

const app = express()

// 插件，设置跨域
app.options('upload', cors())

app.get('/', cors(), (req, res) => {
    res.send("hello nodejs")
})

// upload.single('文件上传时的name')
app.post('/upload', cors(), upload.single('file'), (req, res, next) => {
    // 获取文件
    console.log(req.file);
    // 设置跨域
    // res.set('Access-Control-Allow-Origin', '*')
    const result = {
        id: req.file.filename
    }
    res.send(JSON.stringify(result))
})

// 预览
app.get('/preview/:id', cors(), (req, res) => {
    res.sendFile(`uploads/${req.params.id}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'image/png',
        }
    }, (err) => {
        if(err) {
            console.log('err', err);
            res.status(400).send('file not found')
        }
    })
})

// heroku的端口号可能是随机的
// PORT=5000 node index.js
const port = process.env.PORT || 3000
console.log(`at port:${port}`);
app.listen(port)
```

工具：CodeSandbox

### Sticky

top需要获取初始值

父元素占位：固定前需要获取当前的height，width，left

取消事件监听

节流

### 打包上传

#### lib模式

当你运行 `vue-cli-service build` 时，你可以通过 `--target` 选项指定不同的构建目标。它允许你将相同的源代码根据不同的用例生成不同的构建。

vue cli默认应用模式

你可以通过下面的命令将一个单独的入口构建为一个库：

```text
vue-cli-service build --target lib --name myLib src/index.js
```

这个入口可以是一个 `.js` 或一个 `.vue` 文件。如果没有指定入口，则会使用 `src/App.vue`。当前使用的是`src/index.js`

构建一个库会输出：

- `dist/myLib.common.js`：一个给打包器用的 CommonJS 包 (不幸的是，webpack 目前还并没有支持 ES modules 输出格式的包)
- `dist/myLib.umd.js`：一个直接给浏览器或 AMD loader 使用的 UMD 包
- `dist/myLib.umd.min.js`：压缩后的 UMD 构建版本
- `dist/myLib.css`：提取出来的 CSS 文件 (可以通过在 `vue.config.js` 中设置 `css: { extract: false }` 强制内联)

打包结果myLib.umd.js

```js
// factory 会返回入口文件导出的内容
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object') // nodejs
		module.exports = factory();
	else if(typeof define === 'function' && define.amd) // amd(webpack runtime/浏览器环境)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myLib"] = factory();
	else // window
		root["myLib"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {...});
```

入口文件

```js
// 导出所有组件
export {default as SButton} from './button'
export {default as SIcon} from './icon'
export {default as SButtonGroup} from './buttonGroup'
export {default as SInput} from './input'
export {default as SRow} from './row'
export {default as SCol} from './col'
export {default as SLayout} from './layout'
export {default as SHeader} from './header'
export {default as SAside} from './aside'
export {default as SContent} from './content'
export {default as SFooter} from './footer'
export {default as SToast} from './toast'
export {default as STabs} from './tabs'
export {default as STabsHeader} from './tabsHeader'
export {default as STabsItem} from './tabsItem'
export {default as STabsBody} from './tabsBody'
export {default as STabsPanel} from './tabsPanel'
export {default as SPopover} from './popover'
export {default as SCollapse} from './collapse'
export {default as SCollapseItem} from './collapseItem'
export {default as SCascader} from './cascader'
export {default as SCascaderItem} from './cascaderItem'
export {default as SSlides} from './slides'
export {default as SSlidesItem} from './slidesItem'
export {default as SNav} from './nav'
export {default as SNavItem} from './navItem'
export {default as SSubNav} from './subNav'
export {default as SPager} from './pager'
export {default as STable} from './table'
export {default as SFormRow} from './form-row'
export {default as SUploader} from './uploader'
export {default as SAffix} from './affix'
```

lib模式打包好的包中默认不包括vue

#### .npmignore

```
/.idea/
/docs/
/src/
/tests/
/history/
/dist/demo.html
```

修改package.json增加入口配置

```json
{
  "name": "sin-vue",
  "version": "0.0.5",
  "private": false,
  "main": "dist/sin-vue.umd.min.js",
  ...
}
```

#### 发布0.04版