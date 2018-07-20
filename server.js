var express = require('express');
var app = express();
var ExpressPeerServer = require('./lib/index').ExpressPeerServer;

var server = app.listen(process.env.PORT || 9000);
var options = {};
var peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

var connected = [];
peerserver.on('connection', function (id) {
    var idx = connected.indexOf(id);
    if (idx === -1) {connected.push(id);}
});
peerserver.on('disconnect', function (id) {
    var idx = connected.indexOf(id);
    if (idx !== -1) {connected.splice(idx, 1);}
});
app.get('/peers', function (req, res) {
    return res.json(connected);
});

// options = app._options = util.extend({
//     debug: false,
//     timeout: 5000,
//     key: 'peerjs',
//     ip_limit: 5000,
//     concurrent_limit: 5000,
//     allow_discovery: false,
//     proxied: false
// }, options);
