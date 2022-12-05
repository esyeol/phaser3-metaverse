/** 소켓 클라이언트에 대한 명시가 여기에 추가되어야함. */ 
import {I_PLAYER} from "../constants/assets.js";

export default class player {
    
    constructor(scene,x,y,charactor){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.charactor = charactor; 

        //소켓서버 파트가 정해질 경우, 추가.
        // this.players = {};  // 소켓에 연결중인 player를 objecdt 형식으로 저장.

        // // 캐릭터 지정.
        this.sprite = scene.physics.add.sprite(x,y,I_PLAYER).setSize(30, 40).setOffset(0, 24);
        this.keys = scene.input.keyboard.createCursorKeys();

        this.scene.cameras.main.fadeFrom(1000);
        // this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
        // this.scene.cameras.main.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
        this.scene.cameras.main.startFollow(this.sprite,true);
    }

    // 캐릭터가 이동함에 따라 값을 변경해주는 로직. 
    update(direction){

        const {keys,sprite} = this;
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