
// 请求 HTTP 模块, 赋值变量 http
var http = require('http');

// 调用 http 模块提供的函数: createServer, 这个函数返回一个对象
// 这个对象有 listen 方法， 这个方法有一个数值参数， 指定服务器的端口号
http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello World')
  response.end()
}).listen(8888)

// createServer() 第一个参数也是唯一的参数，一个函数定义
// 函数可以像其他变量一样被传递, 举例来说
function say(word) {
  console.log(word)
}

function execute(someFunction, value) {
  someFunction(value)
}

execute(say, "Hello")

// 再看下之前我们搭建的 HTTP 服务器代码
http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello World')
  response.end()
}).listen(8888)

// 用相同的代码可以达到相同的目的
var http = require('http')

function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.write('Hello World')
  response.end()
}

http.createServer(onRequest).listen(8888)
