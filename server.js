var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

var server = app.listen(process.env.PORT || 9000);

var options = {
    debug: true
};

var peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

// options = app._options = util.extend({
//     debug: false,
//     timeout: 5000,
//     key: 'peerjs',
//     ip_limit: 5000,
//     concurrent_limit: 5000,
//     allow_discovery: false,
//     proxied: false
// }, options);
