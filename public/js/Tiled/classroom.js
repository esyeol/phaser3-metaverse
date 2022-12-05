import player from "../Object/player.js";
import {Square,ClassRoom} from "../constants/scenes.js";
import {I_PLAYER, I_CLASSROOM, I_SQUARE, I_PORTAL, M_SQUARE,M_CLASSROOM} from "../constants/assets.js";

export default class classroom extends Phaser.Scene{
    constructor(){
        super(ClassRoom);
    }
    create(){

        // 스퀘어로 돌아가는 함수.
        let collision = () => this.scene.start(Square); 

        const map = this.make.tilemap({ key: M_CLASSROOM });
        const tileset = map.addTilesetImage("tileset_school",I_CLASSROOM,32,32,0,0);

        // collision layer define
        const spawnPoint = map.findObject("object",(obj) => obj.name === "spawn_point"); 
        const portal = map.findObject("teleport",(obj) => obj.name === "portal");

        // tileMap layer define
        const background = map.createLayer("background", tileset, 0, 0); 
        const interactive = map.createLayer("interactive", tileset, 0, 0); 
        const overhead = map.createLayer("overhead",tileset,0,0); 
        const location = this.physics.add.staticSprite(portal.x,portal.y,); 

        overhead.setDepth(40); // overhead layer 를 background와 interactive layer 위에 배치해서 화면상에 보이는 View가 어색하지 않도록 지정.
        
         // 각 layer 별 충돌 지정부분 활성화.
        background.setCollisionByProperty({ collides: true }); 
        interactive.setCollisionByProperty({ collides: true });

        // player object 생성.
        this.player = new player(this, spawnPoint.x, spawnPoint.y,0); 

        // player & layer 별 충돌 지정.
        this.physics.world.addCollider(this.player.sprite, background); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.
        this.physics.world.addCollider(this.player.sprite, interactive); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.

            // static layer로 지정한 portal 충돌시 classroom 으로 scene 전환.
        this.physics.add.collider(this.player.sprite,location,collision,undefined,this); 

        // this.cameras.main.startFollow(this.player.sprite); // camera follow.
    }
    update(){
        this.player.update();
    }


}