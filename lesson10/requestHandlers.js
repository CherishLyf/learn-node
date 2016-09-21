var querystring = require('querystring')
var fs = require('fs')

// 这模块对解析上传的文件数据做了很好的抽象
var formidable = require('formidable')
var util = require('util')

function start(response) {
  console.log('Request handler "start" was called.')

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log('Request handler "upload" was called.')
  // return 'Hello upload'

  var form =  new formidable.IncomingForm();
  console.log("about to parse")

  form.parse(request, function(error, fields, files) {
    console.log(files);
    console.log("about to parse")
    // fs.renameSync(files.upload.path, '/tmp/test.png')
    var readStream = fs.createReadStream(files.upload.path)
    var writeStream = fs.createWriteStream("/tmp/test.png")
    util.pump(readStream, writeStream, function() {
      fs.unlinkSync(files.upload.path);
    });

    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write('received image: <br/>')
    response.write('<img src="/show">')
  })
}

function show(response, postData) {
  console.log('Request handler "show" was called.')
  fs.readFile('/tmp/test.png', 'binary', function(error, file) {
    if(error) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      response.write(error + '\n')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'})
      response.write(file, 'binary')
      response.end()
    }
  })
}

exports.start = start
exports.upload = upload
exports.show = show
