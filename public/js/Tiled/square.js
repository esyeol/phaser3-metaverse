import {I_PLAYER, I_CLASSROOM, I_SQUARE, I_PORTAL, M_SQUARE} from "../constants/assets.js";
import {Square,ClassRoom} from "../constants/scenes.js";
import player from "../Object/player.js";

export default class square extends Phaser.Scene{
  constructor() {
    super(Square);
  }

  preload() {
    console.log("preload");
  }

  create() {
    console.log("create");
    
    let collision = () => this.scene.start(ClassRoom);

    const map = this.make.tilemap({ key: `${M_SQUARE}` }); 
    const tileset = map.addTilesetImage("hs_tiles_source",`${I_SQUARE}`,32,32,0,0);

   // collision layer define
   const spawnPoint = map.findObject("object",(obj) => obj.name === "spawn_point");
   const portal = map.findObject("teleport", (obj) => obj.name === "portal"); 
    
    /**
     * tileMap layer define 
     * tiledGUI 툴에서 지정한 layer에서 지정한 nameSpace로 각 layer를 나눈다. 
     * */ 
    const background = map.createLayer("background", tileset, 0, 0); 
    const interactive = map.createLayer("interactive", tileset, 0, 0);
    const location = this.physics.add.staticSprite(portal.x,portal.y,I_PORTAL); // cloassroom으로 이동할 좌표값을 sprite 객체로 지정.


    // 각 layer 별 충돌 지정부분 활성화.
    background.setCollisionByProperty({ collides: true });
    interactive.setCollisionByProperty({ collides: true });

    // player create
    this.player = new player(this,spawnPoint.x,spawnPoint.y,0);
    
    // player & layer 별 충돌 지정.
    this.physics.world.addCollider(this.player.sprite, background); 
    this.physics.world.addCollider(this.player.sprite, interactive);

    // static layer로 지정한 portal 충돌시 classroom 으로 scene 전환.
    this.physics.add.collider(this.player.sprite,location,collision,undefined,this); 

    // this.cameras.main.startFollow(this.players.sprite); // camera follow.

    // canvas 내부에 text 문구 띄우기 위한 구문. 테스트나 사용법 안내할 때, 주로 사용.
    this.add
      .text(16, 16, "press 'D' you can use debug mode", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff", // #00ff0000 -> rgb 투명.
      })
      .setScrollFactor(0);

    // debuging mode -> phaser에서 제공하는 디버깅 함수(테스트에서만 사용)
    this.input.keyboard.once("keydown-D", (event) => {
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);

      background.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });

      interactive.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    });
  }

  update() {
    this.player.update(); //player의 위치 갱신. 
  }
}