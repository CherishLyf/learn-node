var http = require('http')

// onRequest() 函数被触发时， 有两个参数: request 和 response
function onRequest(request, response) {
  console.log('Request received.')
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello World')
  response.end()
}

http.createServer(onRequest).listen(8888)

console.log('Server has started.')
