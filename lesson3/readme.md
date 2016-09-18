服务器是如何处理请求的?

当回调启动，我们的 onRequest() 函数被触发的时候，有两个参数被传入： request 和 response

当收到请求时，使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type），使用 response.write() 函数在HTTP相应主体中发送文本“Hello World"
