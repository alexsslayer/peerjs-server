var PeerServer = require('./lib/index').PeerServer;
var server = new PeerServer({
    port: process.env.PORT || 9000,
    key: 'peerjs'
});
