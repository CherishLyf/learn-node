// 通常我们都会有一个 index.js 文件去调用其他应用的其他模块
var server = require('./server')
// 拓展 index.js ， 使得路由函数可以被注入到服务器
var router = require('./router')
var requestHandlers = require('./requestHandlers')

// 将请求处理程序通过一个对象传递， 并且使用松耦合的方式将这个对象注入到 route() 中
var handle = {}
handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show

// server.start()
// server.start(router.route)
server.start(router.route, handle)
