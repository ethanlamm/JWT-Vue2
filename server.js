// 这是后端服务器的配置

// 导入express和bodyParser
const express = require('express')
const bodyParser = require('body-parser')
// 导入jwt
const jwt = require('jsonwebtoken')
// 定义一个密钥
const secret = 'secret_key'

// 创建实例
const app = express()

// 配置bodyparser
app.use(bodyParser.json())

// 配置接口(必须在配置cros中间件之前)
// 获取用户信息接口
app.get('/user', (req, res) => {
  // 在请求数据时，要加一个动画，为了测试，所以让它时间长点，加了一个定时器
  setTimeout(() => {
    res.json({
      name: 'server-username'
    })
  }, 500)
})

// 登录接口
app.post('/login', (req, res) => {
  const { username } = req.body
  if (username === 'ethan') {
    // 登录成功后返回一个token
    res.json({
      code: 0,
      username: 'ethan',
      token: jwt.sign({ username: 'ethan' }, secret, {
        expiresIn: 100 // 表示token 100s后过期
      })
    })
  } else {
    // 登录失败
    res.json({
      code: 1,
      data: '登录失败'
    })
  }
})

// 验证token的接口
app.get('/validate', (req, res) => {
  // 拿到前端请求时带过来的token
  const token = req.headers.Authorization
  // 验证token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({
        code: 1,
        data: 'token失效了'
      })
    } else {
      // token合法，并把token时效延长
      res.json({
        code: 0,
        username: decoded.username,
        token: jwt.sign({ username: decoded.username }, secret, { expiresIn: 100 })
      })
    }
  })
})

// 配置cors中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

// 启动服务器
app.listen(3000)
