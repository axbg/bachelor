const express = require('express');

const PORT = require('./config').PORT;

const controller = require('./controllers');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('./models').database;

db.sync();

io.on('connection', controller);

server.listen(PORT, () => {
  console.log('flow - screening module');
});
