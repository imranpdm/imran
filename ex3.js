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

// var url = "https://www.indeed.co.in/cmp/Paladin-Consulting,-Inc/jobs/National-Recruiter-f4abe55ab67ae7dd?sjdu=QwrRXKrqZ3CNX5W-O9jEvf2IRMi-QPaEvZdyEyGW6a9pOk435Dl8hMfhiQ-4XtLuMwbRF14IoL9PA1IaoHno17oPAYDvt-5lHvteFcIUT7I"
// request(url,function(err,resp,body){
//     var $ = cheerio.load(body);
//     var companyname = $('.jobtitle');
//     var companynametext = companyname.text();
//     console.log('imra',companynametext);
// })
var url = [];
url[0] = "https://www.flipkart.com/dennis-lingo-men-s-solid-casual-black-shirt/p/itmejbhsjzhje6ja?pid=SHTEGZCWE2FWGJUX&srno=s_1_1&otracker=search&lid=LSTSHTEGZCWE2FWGJUXSKABSS&qH=c9507f538a6e79c9"
url[1] ="https://www.flipkart.com/dennis-lingo-men-s-solid-casual-blue-shirt/p/itmek6h3mgrg7jgu?pid=SHTEGZCMHBYZDUHH&otracker=pp_reco_productRecommendation/similar_1";
url[2] ="https://www.flipkart.com/highlander-slim-fit-men-s-beige-trousers/p/itmenvk3fyquvhbr?pid=TROEJR48HGTXFEZX&srno=s_1_1&otracker=search&lid=LSTTROEJR48HGTXFEZXHNBY43&qH=7a6ab7cdf6f73dfb";
var productArray = [];
var done = 0;
for(var i = 0; i < url.length; i++){
    request(url[i],function(err,resp,body){
        var $ = cheerio.load(body);
        var productName = $('._3eAQiD').text();
        var originalPrice = $('._3auQ3N').text().replace('₹','');
        var discountPrice = $('._1vC4OE._37U4_g').text().replace('₹','');
        var discountPercentage = $('.VGWI6T').text().replace(' off','');
        var availableColors = $('#Color').next().find('li');
        var availableSizes = $('#Size').next().find('li');        
        console.log($('.eaKBCI').length);    
        var productObj = {
            name : productName,
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
        productArray.push(productObj);
        done++;
        if(done === url.length){
            console.log(productArray);
        }
    })
}
console.log('completed');
/*var url4 = "https://www.flipkart.com/redmi-3s-dark-grey-16-gb/p/itmemf5cbhdpxvvp?pid=MOBEKWZY4XUVPGAV&srno=s_1_5&otracker=search&lid=LSTMOBEKWZY4XUVPGAV7KSN2X&qH=31e73f89de2ff12a";
request(url4,function(err,resp,body){
    var $ = cheerio.load(body);
    var productName = $('._3eAQiD').text();
    var originalPrice = $('._1vC4OE._37U4_g').text().replace('₹','');
    var sold = $('.row._3FV-Hc').text();
    var features = $('_2PF8IO').next().find('li');
        
     console.log($('._2PF8IO').length);    
    var productObj = {
        name : productName,
        sold: sold,
        originalPrice : originalPrice,
        feauture : [],
        discountPrice : discountPrice,
        discountPercentage : discountPercentage,
        colors : [],
        sizes : []
    };

    features.each(function(i,e){
        var feau = $(e).find('._2PF8IO').text();
        console.log(feau);
        if(feau)
        productObj.feauture.push(feau);
    })

    console.log('Flipkart garment product');
    console.log(productObj);
 })*/

//  var url5 = "https://www.flipkart.com/apple-iphone-6-silver-16-gb/p/itme8dvfeuxxbm4r?pid=MOBEYHZ2NUZGCHKN&srno=s_1_1&otracker=search&lid=LSTMOBEYHZ2NUZGCHKN7PMDIN&qH=c5986779727a5087";
// request(url5,function(err,resp,body){
//     var $ = cheerio.load(body);
//     var productName = $('._3eAQiD').text();
//     var originalPrice = $('._1vC4OE._37U4_g').text().replace('₹','');
//     var emi = $('._3F0R4R').text().replace('₹','');
//     var availableColors = $('#Color').next().find('li');
//     //var availableColors = $('.eaKBCI').next().find('li');
//     var sold = $('.row._3FV-Hc').text();
//     var features = $('._2PF8IO').find('li');
        
//      console.log($('._2PF8IO').length);    
//     var productObj = {
//         name : productName,
//         emi : emi,
//         sold: sold,
//         originalPrice : originalPrice,
//         colors : [],
//         feauture : []
//         // discountPrice : discountPrice,
//         // discountPercentage : discountPercentage,
//         // colors : [],
//         // sizes : []
//     };

//     availableColors.each(function(i,e){
//         var color = $(e).find('._2h52bo ').text();
//         console.log(color);
//         if(color)
//         productObj.colors.push(color);
//     })

//     features.each(function(i,e){
//         var feau = $(e).text();
//         console.log(feau);
//         if(feau)
//         productObj.feauture.push(feau);
//     })

//     console.log('Flipkart garment product');
//     console.log(productObj);
// })

/*var available="https://www.flipkart.com/moto-m-silver-64-gb/p/itmenqavgcezzk2y?pid=MOBENQAVFTG6FPXX&srno=b_1_3&otracker=clp_metro_expandable_4_mobileclp_Motorola_mobiles-store_08ccfc56-4f21-45e1-9667-8c13aee49c5c_wp2&lid=LSTMOBENQAVFTG6FPXXHZBIGV";
var soldout="https://www.flipkart.com/moto-m-gold-32-gb/p/itmenqavzwusfwgf?pid=MOBENQAVHFQNPZEJ&sattr=color&sattr=storage&sattr=ram&st=ram&otracker=clp_metro_expandable_4_mobileclp_Motorola_mobiles-store_08ccfc56-4f21-45e1-9667-8c13aee49c5c_wp2";

request(available,function(err,resp,body){
    var $ = cheerio.load(body);
    var productName = $('._3eAQiD').text();
    var originalPrice = $('._1vC4OE._37U4_g').text().replace('₹','');
    var emi = $('._3F0R4R').text().replace('₹','');
    var availableColors = $('#Color').next().find('li');
    //var availableColors = $('.eaKBCI').next().find('li');
    var sold = $('.row._3FV-Hc').text();
    var features = $('._2PF8IO').find('li');
    var isAvailable = $('._3Plo8Q').length;
        
     console.log($('._2PF8IO').length);    
    var productObj = {
        name : productName,
        emi : emi,
        sold: sold,
        originalPrice : originalPrice,
        isAvailable : (isAvailable > 0)?true:false,
        colors : [],
        feauture : []
        // discountPrice : discountPrice,
        // discountPercentage : discountPercentage,
        // colors : [],
        // sizes : []
    };

    availableColors.each(function(i,e){
        var color = $(e).find('._2h52bo ').text();
        console.log(color);
        if(color)
        productObj.colors.push(color);
    })

    features.each(function(i,e){
        var feau = $(e).text();
        console.log(feau);
        if(feau)
        productObj.feauture.push(feau);
    })

    console.log('Flipkart garment product');
    console.log(productObj);
})*/

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