var express  = require('express');
var path  = require('path');
var request  = require('request');
var cheerio  = require('cheerio');
var fs  = require('fs');
var app  = express();
var port  = 8000;

//example 1

// var url = "http://google.com";
// request(url, function(err,resp,body){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(body);
//     }
    
// })

var destination = fs.createWriteStream('./downloads/google.html');
var url = "http://google.com";
request(url)
    .pipe(destination)
    // .on("finish",function(){
    //     console.log('done');
    // })
    // .on('err',function(err){
    //     console.log(err);
    // });

    destination.on('finish', function(){
        console.log('all done');
    });

app.listen(port);

console.log("Serve" +port);
