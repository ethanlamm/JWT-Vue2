// 这是后端服务器的配置

// 导入express和bodyParser
const express = require('express')
const bodyParser = require('body-parser')

// 创建实例
const app = express()

// 配置跨域(原生写法)
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"),
//         res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization")
//     if (req.method.toLowerCase() === "options") {
//         return res.end();
//     }
//     next();
// })

// 配置bodyparser
app.use(bodyParser.json())

// 配置接口(必须在配置cros中间件之前)
app.get('/user', (req, res) => {
  // 在请求数据时，要加一个动画，为了测试，所以让它时间长点，加了一个定时器
  setTimeout(() => {
    res.json({
      name: 'server-username'
    })
  }, 500)
})

// 配置cors中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

// 启动服务器
app.listen(3000)
