var express  = require('express');
var path  = require('path');
var request  = require('request');
var cheerio  = require('cheerio');
var fs  = require('fs');
var app  = express();
var port  = 4000;

var url = "https://www.indeed.co.in/cmp/Paladin-Consulting,-Inc/jobs/National-Recruiter-f4abe55ab67ae7dd?sjdu=QwrRXKrqZ3CNX5W-O9jEvf2IRMi-QPaEvZdyEyGW6a9pOk435Dl8hMfhiQ-4XtLuMwbRF14IoL9PA1IaoHno17oPAYDvt-5lHvteFcIUT7I"
request(url,function(err,resp,body){
    var $ = cheerio.load(body);
    var companyname = $('.jobtitle');
    var companynametext = companyname.text();
    console.log('imra',companynametext);
})

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