import players from "../Object/players.js";


export default class new_tile_map extends Phaser.Scene {
  constructor() {
    super("new_tile_map");
    Phaser.Scene.call(this,{key:"new_tile_map"});
  }

  preload() {
    console.log("preload");

    players.preload(this);
    // this.load.spritesheet("player", "resource/images/player1.png", {frameWidth: 32,frameHeight: 42,}); // 캐릭터 sprite 이미지 load
    this.load.image("tiles", "resource/images/hs_tiles_source.png"); // 타일맵에 사용된 이미지 리소스 로드.

    this.load.tilemapTiledJSON("map", "resource/images/hs_main_map.json"); // 타일맵 json 이미지 로드.
    this.load.spritesheet("portals", "resource/images/portal_128.png", {frameWidth: 128,frameHeight: 64,}); // portal sprite sheet load
  
  }

  create() {
    // 맵 충돌시, classroom_scene 영역으로 이동하는 함수.
    let collision = () => this.scene.start("class");

    console.log("create");

    const map = this.make.tilemap({ key: "map" }); // 타일 맵 define.
    const tileset = map.addTilesetImage("hs_tiles_source","tiles",32,32,0,0);

    const layer1 = map.createLayer("background", tileset, 0, 0); // background layer
    const layer2 = map.createLayer("interactive", tileset, 0, 0); // background layer 위에 올려진 layer를 추가할 때, 다음과 같이 구성. => interactive는 json 파일에 layer name으로 명시.
    const spawnPoint = map.findObject("object",(obj) => obj.name === "spawn_point"); // player의 스폰지역을 tiled 에서 지정한 영역으로 지정.
    const portal = map.findObject("teleport", (obj) => obj.name === "portal"); // player의 scene 변경 영역 지정.

    console.log(portal.x + portal.y); // tiled 툴에서 지정한 class_room 이동 좌표.

    const location = this.physics.add.staticSprite(
      portal.x,
      portal.y,
      "portals"
    ); // cloassroom으로 이동할 좌표값을 sprite 객체로 지정.

    this.players = new players(this, spawnPoint.x, spawnPoint.y); // player object 생성.
    this.players.create();
    
    layer1.setCollisionByProperty({ collides: true }); // tiled 툴에서 background layer의 collides 영역 활성화.
    layer2.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.players.sprite, layer1); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.
    this.physics.world.addCollider(this.players.sprite, layer2); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.

    this.physics.add.collider(
      this.players.sprite,
      location,
      collision,
      undefined,
      this
    ); //

    this.cameras.main.startFollow(this.players.sprite); // camera follow.

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

      layer1.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });

      layer2.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    });
  }

  update() {
    this.players.update(); //캐릭터가 갱신될 때 마다 update 하는 부분.
  }
}