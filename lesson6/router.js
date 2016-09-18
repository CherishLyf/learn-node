
// 我们在 start() 函数中添加了 handle 参数，
// 并且将 handle 对象作为第一个参数传递给了 route() 函数

function route(handle, pathname) {
  console.log('About to route a request for ' + pathname)

  // 首先检查给定路径对应的请求处理程序是否存在， 如果存在调用相应的函数
  if(typeof handle[pathname] === 'function') {
    handle[pathname]()
  } else {
    console.log('No request handler found for ' + pathname)
  }
}

exports.route = route
