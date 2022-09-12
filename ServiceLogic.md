一、创建并启动服务器

——基于`Node.js`中的`Express`框架 + `jsonwebtoken`第三方库

其他方案：`koa-jwt`框架 [koa-jwt](https://www.npmjs.com/package/koa-jwt)、[Koa中间件使用之koa-jwt](https://www.jianshu.com/p/2552cdf35e66)

`server.js`

注意点：

- 服务器使用中间件`cors`和`vue-cli`配置`proxy`问题：

- 返回的数据可以用`res.json`、`res.send`

- 请求头的Authorization：

  ​	1）在请求发送时，是大写的：`config.headers.Authorization`；

  ​	2）在服务器接收时，是小写的：`req.headers.authorization`

- `server.js`，该文件单独运行`run code `，不用引入到`main.js`中

- 可完善：数据库、密码[md5](https://www.npmjs.com/package/md5)加密



**服务器使用中间件`cors`和`vue-cli`配置`proxy`问题：**

已知服务器定义了一个接口，并启动在`localhost:3000`

```js
app.get('/user', (req, res) => {
  res.send({
      name:'zs',
      age:18
  })
})
```

1.服务器使用中间件`cors`：要写在配置接口前才生效！！！

2.不管服务器是否使用中间件`cors`，在浏览器的新标签页，输入`localhost:3000/user`均能拿到数据

3.当服务器使用中间件`cors`时，返回请求时，响应头会有一个`Access-Control-Allow-Origin`字段，表示允许访问服务器的客户端的来源；若`cors`保持默认配置，则返回`Access-Control-Allow-Origin:*`表示允许所有来源

4.当服务器使用中间件`cors`，`vue-cli`未配置`proxy`时，请求时需要书写完整`URL`，`axios.get('http://localhost:3000/user').then(res=>{...})`才能拿到数据；

5.当服务器未使用中间件`cors`，且`vue-cli`未配置`proxy`，并且是在`vue-cli 8080`项目直接请求`axios.get('http://localhost:3000/user')`时，会出现跨域问题![image-20220907113923544](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20220907113923544.png)

6.当`vue-cli`配置`proxy`，而服务器未使用中间件`cors`时，使用`/api`代理的接口是正常的，但是如果直接请求`axios.get('http://localhost:3000/user')`时，会出现跨域问题![image-20220907113923544](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20220907113923544.png)

7.当`vue-cli`未配置`proxy`，但使用了`/api`，不管服务器是否使用中间件`cors`，此时会请求`http://localhost:8080/api/user`这个路径，但本地是没有这个路径的资源的，所以会报404错误![image-20220907115314202](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20220907115314202.png)

8.当`vue-cli`配置`proxy`，且服务器也使用中间件`cors`时，使用`/api`代理的接口是正常的，直接请求`axios.get('http://localhost:3000/user')`也是可以的

总结：

当服务器使用`cors`中间件时，需要书写完整请求`URL`，才能拿到数据，比较麻烦，因此`vue-cli`提供了`proxy`功能，使用`/api`作为代理的标识符，简化书写代码。设置了`proxy`后，不管服务器是否使用`cors`中间件，使用`/api`做代理的请求均能拿到数据。也就是说，服务器使用`cors`中间件和`vue-cli`配置`proxy`可以二选一，前者书写代码较麻烦，后者较简便。



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