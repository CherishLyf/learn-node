// 我们暂且把作为路由目标的函数称为请求处理程序
// 创建一个 requestHandlers 的模块， 为每个请求处理程序添加一个占位符， 随后导出这些函数
function start() {
  console.log('Request handler "start" was called.')
}

function upload() {
  console.log('Request handler "upload" was called.')
}

exports.start = start
exports.upload = upload
