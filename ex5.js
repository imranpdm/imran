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

var finalProductArray = [];
var totalUrl = 4;

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
        website : 'Snapdeal',
        originalPrice : parseInt(originalPrice.replace(',','')),
        discountPrice : parseInt(discountPrice.replace(',','')),
        porductIsAvailable : (isAvailable > 0)?true:false,
        sizes : sizesArray,
    };
    finalProductArray.push(productObj);
    if(finalProductArray.length == totalUrl){
      console.log(finalProductArray);
    }
});

var url = [];
url[0] = "https://www.flipkart.com/dennis-lingo-men-s-solid-casual-black-shirt/p/itmejbhsjzhje6ja?pid=SHTEGZCWE2FWGJUX&srno=s_1_1&otracker=search&lid=LSTSHTEGZCWE2FWGJUXSKABSS&qH=c9507f538a6e79c9"
url[1] ="https://www.flipkart.com/dennis-lingo-men-s-solid-casual-blue-shirt/p/itmek6h3mgrg7jgu?pid=SHTEGZCMHBYZDUHH&otracker=pp_reco_productRecommendation/similar_1";
url[2] ="https://www.flipkart.com/highlander-slim-fit-men-s-beige-trousers/p/itmenvk3fyquvhbr?pid=TROEJR48HGTXFEZX&srno=s_1_1&otracker=search&lid=LSTTROEJR48HGTXFEZXHNBY43&qH=7a6ab7cdf6f73dfb";
for(var i = 0; i < url.length; i++){
    request(url[i],function(err,resp,body){
        var $ = cheerio.load(body);
        var productName = $('._3eAQiD').text();
        var originalPrice = $('._3auQ3N').text().replace('₹','');
        var discountPrice = $('._1vC4OE._37U4_g').text().replace('₹','');
        var discountPercentage = $('.VGWI6T').text().replace(' off','');
        var availableColors = $('#Color').next().find('li');
        var availableSizes = $('#Size').next().find('li');
        var productObj = {
            name : productName,
            website : 'Flipkart',
            originalPrice : originalPrice,
            discountPrice : discountPrice,
            discountPercentage : discountPercentage,
            colors : [],
            sizes : []
        };
        availableColors.each(function(i,e){
            var color = $(e).find('._2h52bo').text();
            if(color)
            productObj.colors.push(color);
        });
        availableSizes.each(function(i,e){
            var size = $(e).find('._2h52bo').text();
            if(size)
            productObj.sizes.push(size);
        });
        finalProductArray.push(productObj);
        if(finalProductArray.length == totalUrl){
          console.log(finalProductArray);
        }
    })
}

app.listen(port);

console.log("Serve" +port);
