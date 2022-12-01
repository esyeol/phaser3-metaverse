
export default class players {
    
    constructor(scene,x,y){
        this.scene=scene;
        // this.x=x;
        // this.y=y;
        // this.socket=io();
        // this.user = {};
        // this.room = room; // io obj Room 객체 고려.

        // 캐릭터 지정.
        this.sprite = scene.physics.add.sprite(x,y,"player",0).setSize(22,33).setOffset(23,27);
        this.sprite.anims.play("down"); // Player가 정지해있는 경우 animation 정의.
        this.keys = scene.input.keyboard.createCursorKeys();
    }
    
    static preload(scene){
        scene.load.spritesheet("player", "resource/images/man-8.png", {frameWidth:32,frameHeight:48,}); // 캐릭터 sprite 이미지 load
    }

    create(){
  
        // let self = this;
        // this.socket = io();
        // // 여기서 서버의 user 의 대한 정의를 해주어야 함.
        // this.socket.emit("currentUser", function (user) {
        //   Object.keys(user).forEach(function (id) {
        //     if (user[id].id === self.socket.id) {
        //       console.log(`add user ${user}`);
        //       this.players.addUser(user[id].id,500,500);
        //     }else{
        //         console.log(`add ohterUser ${user}`);
        //         this.players.addUser(user[id].id,500,500);
        //     }
        //   });
        // });

        const anims = this.scene.anims; 
        // 이벤트 설정
        anims.create({
			key: 'down',
			frames: anims.generateFrameNumbers('player', {  start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'left',
			frames: anims.generateFrameNumbers('player', {  start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'right',
			frames: anims.generateFrameNumbers('player', {  start: 8, end: 11  }),
			frameRate: 10,
			repeat: -1
		});

        anims.create({
			key: 'up',
			frames: anims.generateFrameNumbers('player', {  start: 12, end: 15  }),
			frameRate: 10,
			repeat: -1
		});

    }


    /**
     * 유저가 메타버스 환경에 입장했을 때, 생성해주는 메서드.
     * @param id the user inherence id
     * @param x spawn x location
     * @param y spawn y location 
    */
    addUser(id,x,y){
        this.user[id] = this.sprite.physics.add.sprite(x,y,"user",0).setSize(22,33).setOffset(23,27);
        this.user[id].name = this.scene.add.text(x-25,y-35,id); // user obj 추가시, 캐릭터에 id 값 텍스트 적용.
    }

    // otherUser add 
    otherUser(id,x,y){

    }

    up(){}
    down(){}
    left(){}
    right(){}


    // 캐릭터가 이동함에 따라 값을 변경해주는 로직. 
    update(){
        const keys= this.keys;
        const sprite = this.sprite;
        const speed = 500;
        const prevVelocity = sprite.body.velocity.clone();

        sprite.body.setVelocity(0); //  player가 정지했을 때, 마지막 프레임 형태로 정지함. 

        if (keys.left.isDown)
		{
            sprite.body.setVelocityX(-speed);
            // sprite.body.setVelocityY(0);
		}
		else if (keys.right.isDown)
		{
            sprite.body.setVelocityX(speed);
            sprite.setFlipX(false);
            // sprite.setVelocityY(0);
		}

        if(keys.up.isDown)
		{
            sprite.body.setVelocityY(-speed);
            sprite.body.setVelocityX(0);
         	
        } 
        else if(keys.down.isDown){
            sprite.body.setVelocityY(speed);
            sprite.body.setVelocityX(0);            
                   
        }

        sprite.body.velocity.normalize().scale(speed);

        if(keys.left.isDown){
            sprite.anims.play('left', true);
        }else if(keys.right.isDown){
            sprite.anims.play('right', true);
        }else if(keys.down.isDown){
            sprite.anims.play('down', true);
        }else if(keys.up.isDown){
            sprite.anims.play('up', true);
        }else{
            sprite.anims.stop();
               // If we were moving, pick and idle frame to use
            //    if (prevVelocity.y < 0) sprite.setTexture("player", 0);
            //    else sprite.setTexture("player", 46);
        } 
    }

}