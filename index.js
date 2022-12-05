
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

/** metaverse multiPlayer socket 처리를 위한 로직.*/

let user = {}; // 소켓서버에 접속하는 유저를 object화 해서 정의함. 단순 접속한 user의 정보가 어떤지를 정의해서 가지고 있는 obj 배열.

// client가 server에게 접속 시도를 했을 때 처리하는 로직. 
io.on('connection',function(socket) {
    console.log(`User ${socket.id} connected`); // 여기서 socketId를 userId로 지정해야함.
    /** 
     * metaverse에 접근한 user의 정보 정의.
     * userId, respawn 위치, 캐릭터 정보. 
     * 일단 이렇게 가지고 있다고 가정하고 개발.
     * */  
    user[socket.id] = {
        x:960.21,
        y:745.67,
        id:socket.id, 
        /**  
         * 추후에 jwt 토큰으로 받아온 값 복호화 진행후 넣어야함.
         * 추가로 캐릭터 정보 width, height 값 넣어야함.
         */ 
    };

    socket.emit('currentUsers',user); // currentUsers 라는 NameSpace로 user obj 의 데이터를 전달 받음.
    socket.broadcast.emit('newUser',user[socket.id]); // 현재 소켓에 접속한 user obj를 제외한 다른 client 에게 메세지를 전송. 

    socket.on('disconnect', function() {
        console.log(`User ${socket.id} disconnected`); 
        delete user[socket.id]; // 저장중인 obj 에서 스택 제거. 
        io.emit('userDisconnected',socket.id); // 소켓 서버에서 client단으로 삭제 nameSpace 호출 여기에 소켓 ID 값 넘겨줌. 
    });

    socket.on('playMovement',(movementData)=>{
        user[socket.id].x = movementData.x;
        user[socket.id].y = movementData.y;
        user[socket.id].rotation = movementData.rotation;
        console.log(`${socket.id} 의 위치 x:${movementData.x}, y:${movementData.y}`);
        socket.broadcast.emit('playerMoved', user[socket.id]);
    });

});



/**실서버용 코드.*/

// app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/dist'));


// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/index.html');
// });

// app.listen(7500,()=>{
//     console.log("server run");
// });