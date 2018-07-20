const express = require("express");
const app = express();
const ExpressPeerServer = require("./lib/index").ExpressPeerServer;

const server = app.listen(process.env.PORT || 9000);
const options = {};
const peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

const peers = [];
peerserver.on('connection', function (id) {
    const idx = peers.indexOf(id);
    if (idx === -1) {
        peers.push(id);
    }
});
peerserver.on('disconnect', function (id) {
    const idx = peers.indexOf(id);
    if (idx !== -1) {
        peers.splice(idx, 1);
    }
});
app.get('/peers', function (req, res) {
    return res.json(peers);
});
