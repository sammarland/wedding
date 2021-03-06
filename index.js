var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');
var compression = require('compression')


const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      PRIVKEY = process.env.PRIVKEY || 'certs/localhost.key'
      CERT = process.env.CERT || 'certs/localhost.cert'
      CHAIN = process.env.CHAIN || ''
    
// Load certs
var privateKey = fs.readFileSync( PRIVKEY, 'utf8');
var certificate = fs.readFileSync( CERT, 'utf8' );
var chain = fs.readFileSync( CHAIN, 'utf8' );

app.use(compression())

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
    key: privateKey,
    cert: certificate,
    ca: chain
}, app).listen(PORT);

console.log("Listening on " + PORT);
