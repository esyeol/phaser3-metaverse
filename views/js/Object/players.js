import {UP,DOWN,LEFT,RIGHT} from "../constants/direction.js"; 
import {I_PLAYER} from "../constants/assets.js";
import connectUser from "../Ui/connectUser.js";
import disconnectUser from "../Ui/disconnectUser.js";
import test from "../Ui/test.js"; //test

class Players {
    
    constructor(scene, room, position,hs) {
        this.scene = scene;
        this.room = room;
        this.position = position;
        // this.socket = io('ws://3.39.249.46:8080',{cors: { origin: '*' }});
        this.socket = io('ws://3.39.249.46:8080/'+hs,{cors: { origin: '*' }}); 
        this.players = {};
        this.id;
        console.log(this.socket.id);
        // this.playerId;
    }
    
    create() {
        this.socket.emit('NEW_PLAYER', this.room, this.position); // player obj를 생성하면, 
        console.log('1');
        console.log(this.socket.id);

        this.socket.on("userId",(data)=>{
            console.log(data);
            this.socket.id=data;
            console.log(this.socket.id);
        });

        // console.log(`userID => ${this.socket.id}`); // undefiend

        // 본인을 추가.
        this.socket.on('NEW_PLAYER', (data) => {
            console.log(`x: ${data.x}, y: ${data.y}, id : ${data.id}, direction: ${data.direction} `);
            this.addPlayer(data.id, data.x, data.y, data.direction,data.nickname);

        });

        // 본인 이외의 다른 유저 추가. 
        this.socket.on('ALL_PLAYERS', (data) => {
            console.log('2');
            console.log(data);
            console.log(`x: ${data[0].x}, y: ${data[0].y}, id : ${data[0].id}, direction: ${data[0].direction} ${data[0].nickname}`);
            
            this.scene.cameras.main.fadeFrom(1000);
            this.scene.scene.setVisible(true, this.room);

            for (let i = 0; i<data.length;i++){
                console.log(data);
                console.log(data[i].id);
                this.addPlayer(data[i].id, data[i].x, data[i].y, data[i].direction,data[i].nickname);
            }

            this.scene.physics.world.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
            this.scene.cameras.main.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
            this.scene.cameras.main.startFollow(this.players[this.socket.id], true);
            this.players[this.socket.id].setCollideWorldBounds(true);

            // 소켓 서버에서 전달 받은 캐릭터의 모션을 처리하는 로직.
            this.socket.on('MOVE', (data) => {
                // console.log(` ID : ${data.id}`);
                this.players[data.id].x = data.x;
                this.players[data.id].y = data.y;
                this.players[data.id].name.x = data.x - 25;
                this.players[data.id].name.y = data.y - 35;
                this.players[data.id].anims.play(data.direction, true);
            });

            // 캐릭터 정지되는 정보를 전달 받음. 
            this.socket.on('STOP', (data) => {
                // console.log(`STOP_LOG : ${data}`);
                this.players[data.id].x = data.x;
                this.players[data.id].y = data.y;
                this.players[data.id].anims.stop();
            });

            // // 메타버스에서 나갈 경우, players 스택에서 제거. 
            this.socket.on('REMOVE', (id,nickname) => {
                console.log(`${id} ${nickname} 퇴장 `);
                disconnectUser(nickname);
                this.players[id].destroy();
                this.players[id].name.destroy();
                delete this.players[id];
            });

            this.registerChat(this.socket);

            // this.socket.on('CHAT', (msg,id) => {
            //     console.log(`${msg} ${id}`);
            //     // chat.innerHTML += `${message}: ${name}<br>`;
            //     // chat.scrollTo(0, chat.scrollHeight);
            // });
        });
    }

    addPlayer(id, x, y, direction,nickname) {
        this.players[id] = this.scene.physics.add.sprite(x, y, I_PLAYER);
        this.players[id].name = this.scene.add.text(x - 25, y - 35, nickname);
        // this.players[id].name = this.scene.add.text(x - 25, y - 35, id);
        this.players[id].anims.play(direction);
        this.players[id].anims.stop();
        connectUser(nickname);
        test(nickname,id);
        if(Object.keys(this.players)==id){
            this.id=id;
            console.log(this.id);
        }
    }

    left() {
        this.players[this.socket.id].name.x = this.players[this.socket.id].x - 30;
        this.players[this.socket.id].body.velocity.x = -300;
        this.players[this.socket.id].body.velocity.y = 0;
        this.players[this.socket.id].anims.play('left', true);
        this.socket.emit('KEY_PRESS', 'left', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    right() {
        this.players[this.socket.id].name.x = this.players[this.socket.id].x - 22;
        this.players[this.socket.id].body.velocity.x = 300;
        this.players[this.socket.id].body.velocity.y = 0;
        this.players[this.socket.id].anims.play('right', true);
        this.socket.emit('KEY_PRESS', 'right', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    up() {
        this.players[this.socket.id].name.y = this.players[this.socket.id].y - 40;
        this.players[this.socket.id].body.velocity.x = 0;
        this.players[this.socket.id].body.velocity.y = -300;
        this.players[this.socket.id].anims.play('up', true);
        this.socket.emit('KEY_PRESS', 'up', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    down() {
        this.players[this.socket.id].name.y = this.players[this.socket.id].y - 33;
        this.players[this.socket.id].body.velocity.x = 0;
        this.players[this.socket.id].body.velocity.y = 300;
        this.players[this.socket.id].anims.play('down', true);
        this.socket.emit('KEY_PRESS', 'down', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    stop() {
        // console.log(`socket ID =>>> ${this.socket.id}`);
        this.players[this.socket.id].body.velocity.x = 0;
        this.players[this.socket.id].body.velocity.y = 0;
        this.players[this.socket.id].anims.stop();
        this.socket.emit('STOP', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    update(direction) {
        const { isUp, isDown, isLeft, isRight } = direction;

        if (isUp) {
            this.up();
        } else if (isDown) {
            this.down();
        } else if (isLeft) {
            this.left();
        } else if (isRight) {
            this.right();
        } else {
            this.stop();
        }
    }
    
    // 채팅 전송 로직 -> 분리. 
    registerChat(socket) {
        let chat = document.getElementById('chat');
        let sendBtn = document.getElementById('submitChat');
        let whispher = document.getElementById('whisperChat');
        let getList = document.getElementById('n-user-list');
        let whispherValue;

    //    function changeValue(target) {
    //         whispherValue=target.value;
    //     }
        getList.addEventListener('change',(target)=>{
            let test = document.getElementById('n-user-list');
            whispherValue = (test.options[test.selectedIndex].value);
            console.log(`변경여여여엉 ${whispherValue}`);
        });

        function sendChat(){
            let message = document.getElementById('msg');
            socket.emit('CHAT',message.value);
            chat.innerHTML += `나: ${message.value}<br>`;
            chat.scrollTo(0, chat.scrollHeight);
            message.value='';
        }

        function sendWhisper() {
            let message = document.getElementById('msg');
            console.log(`수신자 id : ${whispherValue}`);
            console.log(`변경여여여엉 ${whispherValue}`);
            socket.emit('WHISPER',message.value,whispherValue);
            chat.innerHTML +=`<p class="text-orange-300">(귓속말)나: ${message.value}</p><br>`;
            // `(귓속말)나: ${message.value}<br>`;
            chat.scrollTo(0, chat.scrollHeight);
            message.value='';
        }

        sendBtn.addEventListener('click',sendChat);
        whispher.addEventListener('click',sendWhisper);

        socket.on('CHAT', (msg,id) => {
            console.log(`${msg} ${id}`);
            chat.innerHTML += `${id}: ${msg}<br>`;
            chat.scrollTo(0, chat.scrollHeight);
        });

        socket.on('WHISPER', (msg,id) => {
            console.log(`${msg} ${id}`);
            chat.innerHTML += `<p class="text-orange-300">(귓속말): ${msg}</p><br>`;
            // `(귓속말)${id}: ${msg}<br>`;
            chat.scrollTo(0, chat.scrollHeight);
        });


    }
}

export default Players;
