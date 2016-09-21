
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
// var formidable = require('formidable')
var http = require('http')
var url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    var postData = ''
    var pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received.')

    route(handle, pathname, response, request)
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server has started.')
}

// 导出 start
exports.start = start
