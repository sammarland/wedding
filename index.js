var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');


const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      PRIVKEY = process.env.PRIVKEY || 'certs/localhost.key'
      CERT = process.env.CERT || 'certs/localhost.cert'
    
// Load certs
var privateKey = fs.readFileSync( PRIVKEY );
var certificate = fs.readFileSync( CERT );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/travel', function(req, res) {
    res.sendFile(path.join(__dirname + '/travel.html'));
});

app.get('/accomodation', function(req, res) {
    res.sendFile(path.join(__dirname + '/accomodation.html'));
});

app.get('/gifts', function(req, res) {
    res.sendFile(path.join(__dirname + '/gifts.html'));
});

app.get('/rsvp', function(req, res) {
    res.sendFile(path.join(__dirname + '/rsvp.html'));
});


app.get('/style/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style/style.css'));
});

app.get('/.well-known/acme-challenge/8ZxNC6kM3QOdauwPV5X1JN3yCK0VgWXZX_61iAayNq0', function(req, res) {
    res.sendFile(path.join(__dirname + '/data.txt'));
});

app.use(express.static('images'))

https.createServer({
    key: PRIVKEY,
    cert: CERT
}, app).listen(PORT);

console.log("Listening on " + PORT);
