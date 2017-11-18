/*
	Express.js REST parameters example
	Shows how to take values in a RESTful way
	in Express.js 4.0
	This does no checking on the data sent, it just takes
	the values in and adds them to arrays.

  based on code by Tom Igoe
	created 12 Nov 2017
  modified 16 Nov 2017
*/
// include libraries and declare global variables:
var express = require('express');	// include the express library
var https = require('https');     // require the HTTPS library
var http = require('http');       // require the HTTP library
var fs = require('fs');           // require the filesystem library
var app = express();					  // create a server using express
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data


// https stuff
app.use('*', httpRedirect);              // set a redirect function for http
app.use('/',express.static('public'));   // set a static file directory

// bodyParser stuff
app.use(urlencodedParser);

//Cross-origin stuff for API just in case
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test API data
var webdata = [{
  "top": false,
  "bottom": true,
  "location": 900
}];
var physdata = [{"state": true,
                 "speed": 9
}];

// when we get data from the chrome extension
app.post('/chromesubmit', function (req, res) {
	console.log("They posted " + req);

	// var chromedata = new Object();
	// chromedata.top = req.data.top ;
	// chromedata.bottom = req.data.bottom ;
  // chromedata.location = req.data.location ;
	// webdata.push(chromedata);
});

// when we get data from the physical controller
app.post('/submit', function (req, res) {
  // req. ... is however they're sending us data
	//console.log("They posted " + req.data.state + "and" + req.data.speed);

	var newdata = new Object();
	newdata.state = req.data.state;
	newdata.speed = req.data.speed;
	physdata.push(newdata);
});

//this route can serve the most recent data
app.get('/', function(req, res) {

  // or should we use res.send?
  res.json({"alive": "true",
            "data": {
              "state": physdata[0].state,
              "speed": physdata[0].speed,
              "position":{
                "top": webdata[0].top,
                "bottom": webdata[0].bottom,
                "location": webdata[0].location
              }
            }
          });

  console.log("Got a request for /");
});

app.get('/alive', function(req, res) {
	// res.send({"alive": "true"});
  res.json({"alive": "true"});
});

app.get('/state', function(req, res) {
  // res.send({"state": physdata[0].state});
  res.json({"state": physdata[0].state});
});

app.get('/speed', function(req, res) {
  // res.send({"speed": physdata[0].speed});
  res.json({"speed": physdata[0].speed});
});

app.get('/top', function(req, res) {
  res.json({"top": webdata[0].top});
});

app.get('/bottom', function(req, res) {
  res.json({"bottom": webdata[0].bottom});
});

app.get('/location', function(req, res) {
  res.json({"location": webdata[0].location});
});

// replace with https
// app.listen(1992);
console.log("Server is running on port 1990");
function httpRedirect(request,response, next) {
  if (!request.secure) {
    console.log("redirecting http request to https");
    response.redirect('https://' + request.hostname + request.url);
  } else {
    next();     // pass the request on to the express.static middleware
  }
}

// start the server:
http.createServer(app).listen(1990);           // listen for HTTP
https.createServer(options, app).listen(443);  // listen for HTTPS
