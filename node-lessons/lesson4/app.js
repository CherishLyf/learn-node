
var eventproxy = require('eventproxy')
var cheerio = require('cheerio')
var superagent = require('superagent')
var url = require('url')
var async = require('async')

var cnodeUrl = 'https://cnodejs.org/'

var curCount = 0  // 控制并发数

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      console.log(err)
    }

    var topicsUrls = []
    var $ = cheerio.load(res.text)

    $('#topic_list .topic_title').each(function (index, element) {
      var $element = $(element)
      var href = url.resolve(cnodeUrl, $element.attr('href'))
      topicsUrls.push(href)
    })
    console.log(topicsUrls)
    var ep = new eventproxy()

    ep.after('topic_html', topicsUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0]
        var topicHtml = topicPair[1]
        var $ = cheerio.load(topicHtml)

        return {
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim()
        }
      })

      console.log(topics)
    })

    async.mapLimit(topicsUrls, 5, function (topicUrl, callback) {
      curCount++
      console.log('现在的并发数为: ' + curCount)
      superagent.get(topicUrl)
        .end(function (err, tres) {
          console.log('fetch ' + topicUrl + ' successful')
          ep.emit('topic_html', [topicUrl, tres.text])
          curCount--
          callback(null)
        })
    })
  })

//
// app.listen(3000, function () {
//   console.log('app is listening at port 3000');
// });
