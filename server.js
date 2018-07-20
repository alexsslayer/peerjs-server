var express = require('express');
var app = express();
var ExpressPeerServer = require('./lib/index').ExpressPeerServer;

var server = app.listen(process.env.PORT || 9000);
var options = {};
var peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

var peers = [];
peerserver.on('connection', function (id) {
    var idx = peers.indexOf(id);
    if (idx === -1) {
        peers.push(id);
    }
});
peerserver.on('disconnect', function (id) {
    var idx = peers.indexOf(id);
    if (idx !== -1) {
        peers.splice(idx, 1);
    }
});
app.get('/peers', function (req, res) {
    return res.json(peers);
});
