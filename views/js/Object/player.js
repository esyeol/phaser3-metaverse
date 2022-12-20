/** 소켓 클라이언트에 대한 명시가 여기에 추가되어야함. */
// import connected from "../Socket/connection.js";
import {UP,DOWN,LEFT,RIGHT} from "../constants/direction.js"; 
import {I_PLAYER} from "../constants/assets.js";


export default class player {
    
    constructor(scene,x,y,name){
        this.scene = scene;
        this.x = x;
        this.y = y;
        // this.charactor = charactor; 
        this.name=name;

        // socket.io import 
        // this.socket = io('ws://3.39.249.46:8080',{
        //     cors: { origin: '*' }
        // });
        // // this.socket=io();
        // this.players = {};


        this.sprite = this.scene.physics.add.sprite(this.x,this.y,I_PLAYER).setSize(30, 30).setOffset(10, 24);

        this.scene.cameras.main.fadeFrom(1000);
        this.scene.physics.world.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
        this.scene.cameras.main.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
        this.scene.cameras.main.startFollow( this.sprite,true);
        this.sprite.setCollideWorldBounds(true);
        this.scene.cameras.main.centerOn(0, 0); 

        this.text = this.scene.add.text(this.x - 22, this.y - 45,this.name,{ color: '#000000', fontStyle:'bold'}); 
     
        //소켓서버 파트가 정해질 경우, 추가.
        // this.socket = io();  // clinet socket 통신을 위한 Io 객체 생성.
        // this.players = {};  // 소켓에 연결중인 player를 objecdt 형식으로 저장.        

        // 캐릭터 지정.
        // this.sprite = scene.physics.add.sprite(x,y,I_PLAYER).setSize(30, 30).setOffset(10, 24);
        // this.keys = scene.input.keyboard.createCursorKeys();

        // 유저의 이름을 보여주는 text 팔로우 하도록 설정.
        // this.text = this.scene.add.text(x - 22, y - 45,this.name,{ color: '#000000', fontStyle:'bold'}); 
    }

    
    create(){
        // const socket = io('ws://3.39.249.46:8080',{
        //     cors: { origin: '*' }
        //   });
        
          socket.emit("joinMeta","eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57ImV4cCI6MTY3MDkyNDAwMiwiaWF0IjoxNjcwOTAyNDAyLCJVc2VyX0lEIjoiTXpJMCIsIlVfTmFtZSI6IjdabU43WU9jN0oyWSIsIlVfRW1haWwiOiJaMmhrZUc5a2JXeEFibUYyWlhJdVkyOXQiLCJUaW1lWm9uZSI6IkxURXkifS4xYmQ4OWM0ZDJkMjYzNzkzOTFkYTc3M2I5NDJmN2ExMzI3Y2U4NGE1YzJlZjIxNjJiOTQ0ZDRhYWNiMTM1MzIw");
        
          // 소켓 서버에서 복호화 실패시, 작업 내용 작성.
          socket.on('errorMsg',(data)=>{
            console.log(` err : ${data}`);
          });
        
          // 소켓 서버에서 복호화 성공시, 작업 내용 작성.
          socket.on('succMeta',(data)=>{
            console.log(`succ : ${data}`);
            this.addPlayer(800,800,socket.id,'down');
          });

    //     // 연결된 소켓 서버에 jwt 토큰을 보내 현재 메타버스 클라이언트가 가지고 있는 정보가 API DB 단에 저장되어 있는지 판별하기 위해서 다음과 같은 정보 전송. -> 추후 수정.
    //     // this.socket.emit("joinMeta","eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57IlVzZXJfSUQiOiJNVEV3IiwiVV9OYW1lIjoiYUc5dVp6UT0iLCJVX0VtYWlsIjoiYUc5dVp6UkFibUYyWlhJdVkyOXQifS4yN2Y0Nzg5NjczYjFlNWRkYzZmNzRhZTI2NDRmNDQ4YmUzNzhkZmNjZmI0YzNmNTM3MzEyNTAzNTMzOTBkYjJi");
    //     this.socket.emit("joinMeta","connection");
    //     // 소켓 서버에서 복호화 실패시, 작업 내용 작성. -> 소켓 서버단에서 예외처리 값 던지기. 
    //     this.socket.on('errorMsg',(data)=>{
    //      console.log(` err : ${data}`);
    //     });
     
    //     // 소켓 서버에서 복호화 성공시, 작업 내용 작성.
    //     this.socket.on('succMeta',(data)=>{
    //      console.log(`succ : ${data}`); 
    //      // 추후 test 값을 data.id 로 변경. 
    //     //  this.addPlayer(this.x,this.y,data.id,'down');
    //     });

    //     // 서버에서 BroadCast로 호출한 정보값을 client 에 뿌려주기 위한 구문.
    //     this.socket.on('noticeAll',(data)=>{
    //         console.log(`${data}`);
    //         this.scene.cameras.main.fadeFrom(1000);
            
    //         for(let i=0; i<data.length; i++){
    //         this.addPlayer(this.x,this.y,data[i].id,'down');
    //         }

    //         this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
    //         this.scene.cameras.main.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
    //         this.scene.cameras.main.startFollow(this.players[this.socket.id], true);
    //         this.players[this.socket.id].setCollideWorldBounds(true);

    //         // 각 이동에 대한 정의 나열 

    //         // 캐릭터 이동에 대한 정보값을 전달 받아서 처리.
    //         this.socket.on('move',(data)=>{
    //             this.players[data.id].x = data.x;
    //             this.players[data.id].y = data.y;
    //             // this.players[data.id].name.x = data.x - 25;
    //             // this.players[data.id].name.y = data.y - 35;
    //             this.players[data.id].anims.play(data.direction, true); // 서로 다른 유저의 방향을 보내줌. 
    //         });

    //        // 캐릭터 정지되는 정보를 전달 받음. 
    //        this.socket.on('stop', (data) => {
    //            this.players[data.id].x = data.x;
    //            this.players[data.id].y = data.y;
    //            this.players[data.id].anims.stop();
    //        });

    //     });

    }

    //     /**
    //  * @param {x} 유저의 x 좌표 값.  
    //  * @param {y} 유저의 y 좌표 값. 
    //  * @param {id} 유저의 id 값. 
    //  * @param {direction} 유저의 방향 값.
    // */
    // addPlayer(x,y,id,direction) {
    //     this.players[id] = this.scene.physics.add.sprite(x,y,I_PLAYER).setSize(30, 30).setOffset(10, 24);
    //     // this.players[id].name =  this.scene.add.text(x - 25, y - 35, id,{ color: '#000000', fontStyle:'bold'});

    //     // this.scene.cameras.main.fadeFrom(1000);
    //     // this.scene.physics.world.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
    //     // this.scene.cameras.main.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
    //     // this.scene.cameras.main.startFollow( this.sprite,true);
    //     // this.sprite.setCollideWorldBounds(true);
    //     // this.scene.cameras.main.centerOn(0, 0); 

    //     this.players[id].anims.play(direction);
    //     this.players[id].anims.stop();
    // }

    left() {
         this.sprite.body.velocity.x = -300;
         this.sprite.body.velocity.y = -0;
         this.sprite.anims.play('left',true);

        //  this.players[this.socket.id].name.x = this.players[this.socket.id].x-22;
        //  this.players[this.socket.id].body.velocity.x = - 300;
        //  this.players[this.socket.id].body.velocity.y = - 0;
        //  this.players[this.socket.id].anims.play('left',true);
        //  this.socket.emit('press','left',{x:this.players[this.socket.id].x, y:this.palyers[this.socket.id].y});


        // this.players[this.socket.id].name.x = this.players[this.socket.id].x - 30;
        // this.players[this.socket.id].body.velocity.x = -SPEED;
        // this.players[this.socket.id].body.velocity.y = 0;
        // this.players[this.socket.id].anims.play(LEFT, true);
        // this.socket.emit('KEY_PRESS', LEFT, { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    right() {

         this.sprite.body.velocity.x = 300;
         this.sprite.body.velocity.y = 0;
         this.sprite.anims.play('right',true);


        //  this.players[this.socket.id].name.x = this.players[this.socket.id].x-22;
        //  this.players[this.socket.id].body.velocity.x = 300;
        //  this.players[this.socket.id].body.velocity.y = 0;
        //  this.players[this.socket.id].anims.play('right',true);
        //  this.socket.emit('press','right',{x:this.players[this.socket.id].x, y:this.palyers[this.socket.id].y});

        // this.players[this.socket.id].name.x = this.players[this.socket.id].x - 22;
        // this.players[this.socket.id].body.velocity.x = SPEED;
        // this.players[this.socket.id].body.velocity.y = 0;
        // this.players[this.socket.id].anims.play(RIGHT, true);
        // this.socket.emit('KEY_PRESS', RIGHT, { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    up() {

         this.sprite.body.velocity.x = 0;
         this.sprite.body.velocity.y = -300;
         this.sprite.anims.play('up',true);

        //  this.players[this.socket.id].name.x = this.players[this.socket.id].x-22;
        //  this.players[this.socket.id].body.velocity.x = 0;
        //  this.players[this.socket.id].body.velocity.y = -300;
        //  this.players[this.socket.id].anims.play('left',true);
        //  this.socket.emit('press','up',{x:this.players[this.socket.id].x, y:this.palyers[this.socket.id].y});

        // this.players[this.socket.id].name.y = this.players[this.socket.id].y - 40;
        // this.players[this.socket.id].body.velocity.x = 0;
        // this.players[this.socket.id].body.velocity.y = -SPEED;
        // this.players[this.socket.id].anims.play(UP, true);
        // this.socket.emit('KEY_PRESS', UP, { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    down() {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 300;
        this.sprite.anims.play('down',true);


        // this.players[this.socket.id].name.x = this.players[this.socket.id].x-22;
        // this.players[this.socket.id].body.velocity.x = 0;
        // this.players[this.socket.id].body.velocity.y = -300;
        // this.players[this.socket.id].anims.play('down',true);
        // this.socket.emit('press','down',{x:this.players[this.socket.id].x, y:this.palyers[this.socket.id].y});


        // this.players[this.socket.id].name.y = this.players[this.socket.id].y - 33;
        // this.players[this.socket.id].body.velocity.x = 0;
        // this.players[this.socket.id].body.velocity.y = SPEED;
        // this.players[this.socket.id].anims.play(DOWN, true);
        // this.socket.emit('KEY_PRESS', DOWN, { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    stop() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.anims.stop();

        // this.players[this.socket.id].body.velocity.x = 0;
        // this.players[this.socket.id].body.velocity.y = 0;
        // this.players[this.socket.id].anims.stop();
        // this.socket.emit('stop', { x: this.players[this.socket.id].x, y: this.players[this.socket.id].y });
    }

    // 캐릭터가 이동함에 따라 값을 변경해주는 로직. 
    update(direction){

        //text Follow
        this.text.x = this.sprite.body.position.x-22; 
        this.text.y = this.sprite.body.position.y-45;

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

        // const {keys,sprite} = this;
        // const speed = 500;
        // const prevVelocity = sprite.body.velocity.clone();
    
        // sprite.body.setVelocity(0); //  player가 정지했을 때, 마지막 프레임 형태로 정지함. 

        // // 유저 이름과 캐릭터 동시에 이동하도록 지정하는 값 
        // this.text.x = sprite.body.position.x-22; 
        // this.text.y = sprite.body.position.y-45;

        // if (keys.left.isDown )
		// {
        //     sprite.body.setVelocityX(-speed);
        //     // sprite.body.setVelocityY(0);
		// }
		// else if (keys.right.isDown)
		// {
        //     sprite.body.setVelocityX(speed);
        //     sprite.setFlipX(false);
        //     // sprite.setVelocityY(0);
		// }

        // if(keys.up.isDown)
		// {
        //     sprite.body.setVelocityY(-speed);
        //     sprite.body.setVelocityX(0);
         	
        // } 
        // else if(keys.down.isDown){
        //     sprite.body.setVelocityY(speed);
        //     sprite.body.setVelocityX(0);            
          
        // }
        // sprite.body.velocity.normalize().scale(speed);

        // if(keys.left.isDown){
        //     sprite.anims.play('left', true);
        // }else if(keys.right.isDown){
        //     sprite.anims.play('right', true);
        // }else if(keys.down.isDown){
        //     sprite.anims.play('down', true);
        // }else if(keys.up.isDown){
        //     sprite.anims.play('up', true);
        // }else{
        //     sprite.anims.stop();
        //     //    if (prevVelocity.y < 0) sprite.setTexture(I_PLAYER, 0);
        //     //    else sprite.setTexture(I_PLAYER, 0);
        // } 
    }

        
    // /** 
    //  * Client단에서 유저가 추가 될때 처리하기 위한 로직.
    //  * @param {id} userId 고유값을 넣어준다. 추후 JWT 토큰값에서 유저 ID 값 추출후 작업 진행.
    //  * @param {x} x 좌표값 
    //  * @param {y} y 좌표값 
    //  * 
    //  * */
    // addPlayer(id,x,y){
    //     this.players[id] = scene.physics.add.sprite(x,y,I_PLAYER).setSize(30, 30).setOffset(10, 24);
    //     this.keys = scene.input.keyboard.createCursorKeys();

    //     this.scene.cameras.main.fadeFrom(1000);
    //     this.scene.physics.world.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
    //     this.scene.cameras.main.setBounds(0, 0, this.scene.widthInPixels, this.scene.heightInPixels);
    //     this.scene.cameras.main.startFollow(this.sprite,true);
    //     this.scene.cameras.main.centerOn(0, 0); 

    //     // 유저의 이름을 보여주는 text 팔로우 하도록 설정.
    //     this.text = this.scene.add.text(x - 22, y - 45,'닉네임',{ color: '#000000', fontStyle:'bold'}); 
    // }



}