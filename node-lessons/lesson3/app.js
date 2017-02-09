var express = require('express')
var eventproxy = require('eventproxy')
var cheerio = require('cheerio')
var superagent = require('superagent')
var url = require('url')

var app = express()

var cnodeUrl = 'https://cnodejs.org/'

app.get('/', function (req, res) {
  superagent.get(cnodeUrl)
    .end(function (err, sres) {
      if (err) {
        console.log(err)
      }

      var topicUrls = []
      var $ = cheerio.load(sres.text)

      $('#topic_list .topic_title').each(function (index, element) {
        var $element = $(element)
        var href = url.resolve(cnodeUrl, $element.attr('href'))
        topicUrls.push(href)
      })

      var ep = new eventproxy()

      ep.after('topic_html', topicUrls.length, function (topics) {
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

        res.send(topics)
      })

      topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl)
          .end(function (err, tres) {
            console.log('fetch ' + topicUrl + ' successful')
            ep.emit('topic_html', [topicUrl, tres.text])
          })
      })
    })
})




app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
