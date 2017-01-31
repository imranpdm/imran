// // const request = require("tinyreq");

// // request("http://ionicabizau.net/", function (err, body) {
// //     console.log(err || body); // Print out the HTML
// // });

// const cheerio = require("cheerio");

// // Parse the HTML
// let $ = cheerio.load("<h2 class='title'>Hello world</h2>");

// // Take the h2.title element and show the text
// console.log($("h2.title").text());

var express  = require('express');
var path  = require('path');
var request  = require('request');
var cheerio  = require('cheerio');
var fs  = require('fs');
var app  = express();
var port  = 4000;



var available="https://www.snapdeal.com/product/levis-blue-regular-fit-shirt/622507231588";

request(available,function(err,resp,body){
    var $ = cheerio.load(body);
    var productName = $('.pdp-e-i-head').text();
    var originalPrice = $('.pdpCutPrice').text().replace('Rs.','');
    var discountPrice = $('.pdp-final-price span').text();
    var sizes = $('.squared-attr-value .sqt-attr-val div');
    var sizesArray = [];
    var isAvailable = $('#add-cart-button-id').length;
    sizes.each(function(i,e){
      var sizeName = $(e).find('.attr-squared').attr('selectedattr');
      var isSold = $(e).find('.attr-squared').attr('data-sold');
      if(sizeName){
          sizesArray.push({name:sizeName,isSold:isSold});
      }
    })

    var productObj = {
        name : productName.replace('\n','').replace('\t','').trim(),
        originalPrice : parseInt(originalPrice.replace(',','')),
        discountPrice : parseInt(discountPrice.replace(',','')),
        porductIsAvailable : (isAvailable > 0)?true:false,
        sizes : sizesArray,
    };

    console.log('Snapdeal garment product');
    console.log(productObj);
});

app.listen(port);

console.log("Serve" +port);

// var express = require('express');
// var fs = require('fs');
// var request = require('request');
// var cheerio = require('cheerio');
// var app     = express();

// app.get('/scrape', function(req, res){

//     url = 'http://www.imdb.com/title/tt1229340/';

//     request(url, function(error, response, html){
//         if(!error){
//             var $ = cheerio.load(html);

//             var title, release, rating;
//             var json = { title : "", release : "", rating : ""};

//             $('.header').filter(function(){
//                 var data = $(this);
//                 title = data.children().first().text();

//                 // We will repeat the same process as above.  This time we notice that the release is located within the last element.
//                 // Writing this code will move us to the exact location of the release year.

//                 release = data.children().last().children().text();

//                 json.title = title;

//                 // Once again, once we have the data extract it we'll save it to our json object

//                 json.release = release;
//             })
//         }
//     })
// })

// app.listen('8081')
// console.log('Magic happens on port 8081');
// exports = module.exports = app;
