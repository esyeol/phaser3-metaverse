
const express = require('express');
const app = express();

/** socket.io test layer */
const http = require('http');

const path = require('path');
const socketIO = require('socket.io');

const server = http.Server(app); 
const io = socketIO(server,{
    pingTimeout:60000,
});

/**socket.io test layer2 */
app.set('port',7500); // run server setup
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/dist'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname,'/index.html');
});

server.listen(7500,()=>{
    console.log('metaverse server run');
});
