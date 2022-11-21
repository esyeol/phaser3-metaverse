import players from "../Object/players.js";

export default class new_tile_map extends Phaser.Scene{
    constructor(){
        super("new_tile_map");
    }   

    preload(){
        console.log('preload');
        this.load.spritesheet('player','resource/images/player1.png',{frameWidth:32,frameHeight:42}); // 캐릭터 sprite 이미지 load
        this.load.image('tiles','resource/images/hs_tiles_source.png'); // 타일맵에 사용된 이미지 리소스 로드.
        this.load.tilemapTiledJSON('map','resource/images/hs_main_map.json'); // 타일맵 json 이미지 로드.
        
    }
    create(){
        console.log('create');
        const map = this.make.tilemap({key:'map'}); // 타일 맵 define.
        const tileset = map.addTilesetImage('hs_tiles_source','tiles',32,32,0,0);

        const layer1 = map.createStaticLayer('background',tileset,0,0); // background layer
        const layer2 = map.createLayer('interactive',tileset,0,0); // background layer 위에 올려진 layer를 추가할 때, 다음과 같이 구성. => interactive는 json 파일에 layer name으로 명시.
        
        // +player(유저) 스폰을 tiled tool 에서 script로 지정할지 코드에서 하드 코딩으로 지정할지 고려. 

        this.players = new players(this, 700, 700); // player object 생성.
        // this.players = new players(this, 400, 700); // player object 생성.
        // this.players = new players(this, 300, 700); // player object 생성.
        // this.players = new players(this, 200, 700); // player object 생성.




        layer1.setCollisionByProperty({collides:true}); // tiled 툴에서 background layer의 collides 영역 활성화. 
        layer2.setCollisionByProperty({collides:true}); 
        this.physics.world.addCollider(this.players.sprite,layer1); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과. 
        this.physics.world.addCollider(this.players.sprite,layer2); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과. 
        
        this.cameras.main.startFollow(this.players.sprite); // camera follow. 

        // canvas 내부에 text 문구 띄우기 위한 구문. 테스트나 사용법 안내할 때, 주로 사용.
        this.add 
        .text(16,16,"debuging mode ",{
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff", // #00ff0000 -> rgb 투명.
        })
        .setScrollFactor(0);

        // debuging mode -> phaser에서 제공하는 디버깅 함수(테스트에서만 사용)
        this.input.keyboard.once("keydown-D",(event)=>{
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
            layer1.renderDebug(graphics, {
              tileColor: null, // Color of non-colliding tiles
              collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
              faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
            });
            layer2.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
              });
        });
    }
    update(){
        this.players.update();

    }




}