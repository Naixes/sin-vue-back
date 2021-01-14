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
        // ???
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
        // await browser.close()
        // server.close()
    });
    // await page.goto('http://127.0.0.1:1234')
    // let p = path.join(__dirname, 'dist', 'index.html')
    // await page.goto(`file://${p}`)
    await page.goto(`http://127.0.0.1:${port}`)
})()