import Player from "../js/Object/player.js";
import { I_SQUARE, M_SQUARE,I_PLAYER, I_PORTAL } from "../js/constants/assets.js";
import getQueryString from "../js/Util/getQuery.js";
export default class baseSene extends Phaser.Scene{

    constructor(key){
        super({ key });
        this.key = key;
    }

    // player obj 생성 & 위치 & scene 전환에 필요한 key 값등을 정의. 
    init(position){
        this.scene.setVisible(false, this.key);
        // this.player = new Player(this, this.key, position,"HS"); // Socket Name Space 구분을 위해 임의로 지정.
        this.player = new Player(this, this.key, position,getQueryString('key'));
        this.transition = true;
        this.input.keyboard.removeAllListeners();
        this.background;
        this.interactive;
        this.location;
        this.portal;
        // this.scene.setVisible(false,this.key);
         
    }
  

    /**
     * @param {tileMap} 화면에 랜더링 할 json 파일 set
     * @param {tileSet } tileMap 제작에 사용되는 images 파일 set
     * @param {tileSource} 맵에 반영되는 이미지 파일의 이름.
    */
    create(tileMap,tileSet){
        console.log('super create');

        this.map = this.make.tilemap({key:`${tileMap}`});
        this.tileset = this.map.addTilesetImage(`${tileSet}`,`${tileSet}`,32,32,0,0);

        this.portal = this.map.findObject("teleport",(object)=>object.name="portal");

        this.background = this.map.createLayer("background",this.tileset,0,0);
        this.interactive = this.map.createLayer("interactive",this.tileset,0,0);
        this.location = this.physics.add.staticSprite(this.portal.x,this.portal.y,I_PORTAL);

        this.background.setCollisionByProperty({collides:true});
        this.interactive.setCollisionByProperty({collides:true});

        // //소켓연결
        this.player.create();

        console.log(`${this.player}`);
        console.log(`${this.player.players[this.id]}`);
        console.log(`${this.player.players[this.player.socket.id]}`);
        
        this.cameras.main.on('camerafadeincomplete', () => {
            this.transition = false;
        this.input.keyboard.on('keyup',(event)=>{
            if (event.keyCode >= 37 && event.keyCode <= 40) {
                this.player.stop();
            }
        });
        this.registerCollision();
    });
        this.createJoystick();
        this.initKeyboard();      
    }

    registerCollision() {
        throw new Error('registerCollision() not implemented');
    }


      // keyboard & joystick에 대한 키 값을 정의. 
      initKeyboard() {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        this.keyboard = {
            cursorKeys,
            isUp: () => {
                return this.joystick.up || cursorKeys.up.isDown;
            },
            isLeft: () => {
                return this.joystick.left || cursorKeys.left.isDown;
            },
            isDown: () => {
                return this.joystick.down || cursorKeys.down.isDown;
            },
            isRight: () => {
                return this.joystick.right || cursorKeys.right.isDown;
            },
        };
    }

    /**initial create joystick */
    createJoystick() {   
            console.log("create joyStick");
            this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
              x: 0,
              y: 0,
              radius: 50,
              base: this.add.circle(0, 0, 50, 0x888888, 0.6).setDepth(1),
              thumb: this.add.circle(0, 0, 25, 0xcccccc, 0.8).setDepth(1),
              dir: "4dir",
            });
            this.joystick.setVisible(false);
            this.input.on("pointerup", () => {
              if (!this.isInteracting) {
                this.joystick.setVisible(false);
              }
            });
            this.input.on("pointerdown", (pointer) => {
              if (!this.isInteracting) {
                this.joystick.setPosition(pointer.x, pointer.y);
                this.joystick.update();
                this.joystick.setVisible(true);
              }
            });
    }

    update() {
        // console.log('baseSene Update');
        if (this.transition === false) {
        this.player.update({
            isUp: this.keyboard.isUp(),
            isDown: this.keyboard.isDown(),
            isLeft: this.keyboard.isLeft(),
            isRight: this.keyboard.isRight(),
        });
    }
    
}


}