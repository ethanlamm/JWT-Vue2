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
      msg: '登录成功',
      username: 'ethan',
      token: jwt.sign({ username: 'ethan' }, secret, {
        expiresIn: 20 // 表示token 20s后过期
      })
    })
  } else {
    // 登录失败
    res.json({
      code: 1,
      msg: '登录失败'
    })
  }
})

// 验证token的接口
app.get('/validate', (req, res) => {
  // 拿到前端请求时带过来的token
  const token = req.headers.authorization.split(' ')[1]
  // 验证token
  try {
    const decoded = jwt.verify(token, secret)
    res.send({
      code: 0,
      msg: 'token有效',
      username: decoded.username,
      token: jwt.sign({ username: decoded.username }, secret, { expiresIn: 20 })
    })
  } catch (error) {
    res.send({
      code: 1,
      msg: 'token失效了'
    })
  }
})

// 配置cors中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

// 启动服务器
app.listen(3000)
