// 通常我们都会有一个 index.js 文件去调用其他应用的其他模块
var server = require('./server')
// 拓展 index.js ， 使得路由函数可以被注入到服务器
var router = require('./router')

// server.start()
server.start(router.route)

// 现在我们的服务器已经使用路由模块了，并将请求的路径传递给路由
