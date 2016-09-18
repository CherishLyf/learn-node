// 我们暂且把作为路由目标的函数称为请求处理程序
// 创建一个 requestHandlers 的模块， 为每个请求处理程序添加一个占位符， 随后导出这些函数

// function start() {
//   console.log('Request handler "start" was called.')
// }
//
// function upload() {
//   console.log('Request handler "upload" was called.')
// }

// 直接了当的处理方式(让处理程序通过 onRequest 函数直接返回 return)，看似有效， 实则并非如此
function start() {
  console.log('Request handler "start" was called.')
  return 'Hello Start'
}

function upload() {
  console.log('Request handler "upload" was called.')
  return 'Hello upload'
}

exports.start = start
exports.upload = upload
