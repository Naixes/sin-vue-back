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

// 多文件上传
// app.post('/uploads', cors(), upload.array('files', 12), (req, res, next) => {
//     const result = req.files.map(f => f.filename)
//     res.send(JSON.stringify(result))
// })

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