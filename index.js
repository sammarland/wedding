var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 5000

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/rsvp', function(req, res) {
    res.sendFile(path.join(__dirname + '/rsvp.html'));
});


app.get('/style/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style/style.css'));
});

app.listen(PORT);
