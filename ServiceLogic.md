一、创建并启动服务器

——基于`Node.js`中的`Express`框架 + `jsonwebtoken`第三方库

其他方案：`koa-jwt`框架 [koa-jwt](https://www.npmjs.com/package/koa-jwt)、[Koa中间件使用之koa-jwt](https://www.jianshu.com/p/2552cdf35e66)

`server.js`

注意点：

- 服务器解决跨域=>插件`cors`；同时`vue.config.js`也要配置`devServer.proxy`

- 返回的数据可以用`res.json`、`res.send`

- 请求头的Authorization：

  ​	1）在请求发送时，是大写的：`config.headers.Authorization`；

  ​	2）在服务器接收时，是小写的：`req.headers.authorization`

- `server.js`，该文件单独运行`run code `，不用引入到`main.js`中

- 可完善：数据库、密码[md5](https://www.npmjs.com/package/md5)加密



二、封装`Axios`和定义`API`接口

由于`const instance=axios.create()`，`instance`是`Promise`；

在封装请求函数时，`return instance()`--`Promise`

并且定义接口时`return request(url,method,data)`--`Promise`，

因此，在使用接口时，可以用`async`和`await`

并且，在`vuex`中是返回`Promise`的(`return Promise.resolve()`或`return Promise.reject()`)

所以在 `store.dispatch('toValidate')`时，可以用`async`和`await`



三、[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- 配置项：`expiresIn`：{Number}  单位：秒
- `jwt.sign()`和`jwt.verify()`的使用



四、`router-link`菜单激活

- 准确匹配：`exact-active-class`
- 模糊匹配：`active-class`



五、`token`的获取

`request.js`的`instance.interceptors.request`中的请求头需要`token`；

`token`有两种取法：

- 从`store`中取，无需`JSON.parse()`，`vuex`中已转换
- 从`localStorage`中取，需要`JSON.parse()`！！！！！



六、`config.url`的应用