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