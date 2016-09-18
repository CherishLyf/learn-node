// nodejs 是事件驱动的
var http = require('http')

// 无论我们的服务器何时收到一个请求， 这个函数都会被调用
function onRequest(request, response) {
  console.log('Request received.')
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello World')
  response.end()
}

http.createServer(onRequest).listen(8888)

// 在创建完服务器， 即使没有 Http 请求进来， 我们的代码还继续有效的进行
console.log('Server has started.')

// 当运行 node server.js, 命令行马上输出 ‘Server has started.’
// 当我们在浏览器访问 http://localhost:8888/， 命令行输出 'Request received'
