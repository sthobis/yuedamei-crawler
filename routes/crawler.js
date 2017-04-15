var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

/* GET users listing. */
router.get('/:category/:album', function(req, res) {
  var url = constructUrl(req.params.category, req.params.album);
  console.log('======================');
  console.log('Visiting page ' + url);
  
  crawlImage(function(images) {
    res.render('crawler', { images: images });
  }, url);
});

function constructUrl(category, album) {
  return `http://www.yuedamei.com/${category}/${album}.html`;
}

function crawlImage(callback, url, data) {
  var images = data || [];
  console.log('======================');
  console.log('Crawling url : ', url);

  request(url, function(error, response, body) {

    if(error) {
      console.log('Error: ' + error);
    }

    // Check status code (200 is HTTP OK)
    console.log('Status code: ' + response.statusCode);

    if(response.statusCode === 200) {

      // Parse the document body
      var $ = cheerio.load(body);
      var image = $('.ArticlePicBox img').attr('src');
      console.log('Image found : ', image);
      images.push(image);

      if ($('#nl').length) {
        var nextUrl = 'http://www.yuedamei.com' + $('#nl a').attr('href');
        console.log('Next url : ', nextUrl);
        crawlImage(callback, nextUrl, images);
      } else {
        callback(images);
      }
    }
  });
}

module.exports = router;
