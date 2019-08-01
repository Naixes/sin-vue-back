## 我自己的Vue UI 组件库
`* {margin: 0; padding: 0; box-sizing: border-box;}`

## 开发日志

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

chai：

BDD：行为驱动开发

TDD：测试驱动开发

动态生成一个按钮

测试参数和事件（chai-spies）

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
      1. 在 package.json 里将版本号改为 0.0.1，等我们做完了再改成 1.0.0
      2. 创建 index.js，在 index.js 里将 要导出的内容全部导出
      3. 添加配置 “mian”:“index.js”
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













