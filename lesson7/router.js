
// 我们在 start() 函数中添加了 handle 参数，
// 并且将 handle 对象作为第一个参数传递给了 route() 函数

function route(handle, pathname) {
  console.log('About to route a request for ' + pathname)

  // 首先检查给定路径对应的请求处理程序是否存在， 如果存在调用相应的函数
  if(typeof handle[pathname] === 'function') {
    // 请求路由需要将请求处理程序返回给它的信息返回给服务器
    return handle[pathname]()
  } else {
    console.log('No request handler found for ' + pathname)
    return '404 Not found'
  }
}

exports.route = route
