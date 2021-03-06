
// 我们需要的所有数据都包含在 request 对象中，
// 为了解析这些数据， 需要用到额外的 nodejs 模块，分别是 url 和 querystring

/*************************************************************

                                url.parse(string).query
                                            |
            url.parse(string).pathname      |
                        |                   |
                        |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                              querystring(string)["hello"]


***********************************************************/


var http = require('http')
var url = require('url')

/**
  *  function start() {
  *    function onRequest(request, response) {
  *      var pathname = url.parse(request.url).pathname
  *      console.log('Request for' + pathname + ' received.')
  *      response.writeHead(200, {'Content-Type': 'text/plain'})
  *      response.write('Hello World.')
  *      response.end()
  *    }
  *
  *    http.createServer(onRequest).listen(8888)
  *    console.log('Server has started.')
  *  }
 **/

/**  拓展 start() 函数, 以便将路由函数传递进去
  *  function start(route) {
  *    function onRequest(request, response) {
  *      var pathname = url.parse(request.url).pathname
  *      console.log('Request for ' + pathname + ' received.')
  *
  *      route(pathname)
  *
  *      response.writeHead(200, {'Content-Type': 'text/plain'})
  *      response.write('Hello World')
  *      response.end()
  *    }
  *
  *    http.createServer(onRequest).listen(8888)
  *    console.log('Server has started.')
  *  }
 **/

 /* 将 handle 传递给服务器
  * function start(route, handle) {
  *   function onRequest(request, response) {
  *     var pathname = url.parse(request.url).pathname
  *     console.log('Request for ' + pathname + ' received.')
  *
  *     route(handle, pathname)
  *
  *     response.writeHead(200, {'Content-Type': 'text/plain'})
  *     response.write('Hello World')
  *     response.end()
  *   }
  *
  *  http.createServer(onRequest).listen(8888)
  *  console.log('Server has started.')
  * }
 **/

 // 将请求处理程序通过请求路由返回的内容响应给浏览器
 function start(route, handle) {
   function onRequest(request, response) {
     var pathname = url.parse(request.url).pathname
     console.log('Request for ' + pathname + ' received.')

     response.writeHead(200, {'Content-Type': 'text/plain'})
     var content = route(handle, pathname)
     response.write(content)
     response.end()
   }

   http.createServer(onRequest).listen(8888)
   console.log('Server has started.')
 }

// 导出 start
exports.start = start
