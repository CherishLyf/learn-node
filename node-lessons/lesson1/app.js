// 引入 express 模块
var express = require('express')

// 调用 express 实例，它是一个函数，会返回一个 express 实例
var app = express()

// app 本身有很多方法,get,post,put/patch,delete 等，这里调用 get 方法，为我们的 '/' 路径指定一个 handler 函数
// handler 函数会接受 req 和 res 两个对象，他们分别请求 request 和 response
// request 中包含浏览器传来的信息, 比如 query,body,headers 之类的，都可以通过 req 对象访问到
// response 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出信息，比如 header 信息，比如想要向浏览器输出的内容

app.get('/', function (req, res) {
  res.send('Hello World')
})


// 定义好我们 app 的行为之后，让它监听本地的 3000 端口, 这里的第二个函数是个回调函数，会在 listen 动作执行后执行

app.listen(3000, function () {
  console.log('app is listening at port 3000')
})
