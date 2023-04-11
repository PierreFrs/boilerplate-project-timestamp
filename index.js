// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Blank object to be used in the response
let resObject = {};
// Get request
app.get("/api/:date", (req, res) => {
  // Capturing the date input
  let date = req.params.date;
  // If its a timestamp
  if (/\d{5,}/.test(date)) {
    date = parseInt(date);
    resObject["unix"] = date;
    resObject["utc"] = new Date(date).toUTCString();
  // Error Handler
  } else if (!resObject["unix"] || !resObject["utc"]) {
    res.json({ error: "Invalid Date" });
  // If it is a string
  } else {
    resObject["unix"] = new Date(date).getTime();
    resObject["utc"] = new Date(date).toUTCString();
  } 
  // Rendering the date input as a string
  res.json(resObject);
});

// Handling if there is no date on the date input
app.get("/api/", (req, res) => {
  resObject["unix"] = new Date().getTime();
  resObject["utc"] = new Date().toUTCString();
  res.json(resObject);
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

