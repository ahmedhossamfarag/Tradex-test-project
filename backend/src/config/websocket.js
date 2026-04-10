require('dotenv').config();
const { WebSocketServer } = require('ws');

let wss;
let onClose;

function getWSS() {
    return wss;
}

function initWSServer(server) {
    wss = new WebSocketServer({ server });
    console.log('WSS server created');
    wss.on('connection', function connection(ws) {
        console.log('Client connected');
        ws.on('error', console.error);
    });
    wss.on('close', function close(){
        console.log('WSS server closed');
        if (onClose) onClose();
    });
    console.log('WSS server started');
}

function setOnClose(close) {
    onClose = close;
}

function sendToAll(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = { getWSS, initWSServer, setOnClose, sendToAll };