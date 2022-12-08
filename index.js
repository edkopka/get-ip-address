// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { request } = require('express');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, resp) => {
  console.log('************ New Request ************')
  console.log(req.headers);
  console.log(req.socket.remoteAddress);
  resp.json({ 
    ipaddress: {
      xClientIp: req.headers['x-client-ip'],
      xForwardedFor: req.headers['x-forwarded-for'], // Not sure where to get the ip address from. Try again when publicly hosted.
      CfConnectingIp: req.headers['CF-Connecting-IP'],
      fastlyClientIp: req.headers['Fastly-Client-Ip'],
      trueClientIp: req.headers['True-Client-Ip'],
      xRealIp: req.headers['x-real-ip'],
      xClusterClientIp: req.headers['X-Cluster-Client-IP'],
      xForwarded: req.headers['X-Forwarded'],
      forwardedFor: req.headers['Forwarded-For'],
      forwarded: req.headers['Forwarded'],
      requestSocket: req.socket.remoteAddress,
      requestInfo: req.info.remoteAddress
    },
    language: req.headers['accept-language'] ?? 'empty',
    software: req.headers['user-agent'] ?? 'empty'
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
