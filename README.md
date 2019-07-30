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

loading