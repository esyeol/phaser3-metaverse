
/**
 * phaser default map set 
 */
import player from "../Object/player.js";
export default class tile_map extends Phaser.Scene{
    constructor(){
        super("tile_map");
    }

    
    //게임 실행시 구성하는 asset을 load 하는데 사용. 
    preload(){
        console.log("preload");
        player.preload(this);

        // 타일맵 생성.
        // this.load.image('tiles','resource/images/terrain_atlas.png');
        this.load.image('tiles','resource/images/hs-map.png');
        this.load.tilemapTiledJSON('map','resource/images/square_map.json');
    }
    
    // phaser 내부에서 게임 개체 정의. 
    create(){
        console.log("create");

       
        const map = this.make.tilemap({key:'map'});
        const tileset = map.addTilesetImage('hs-map','tiles',32,32,0,0);
        const layer1 = map.createStaticLayer('background',tileset,0,0); // background layer
        const layer2 = map.createLayer('interactive',tileset,0,0); // background layer 위에 올려진 layer를 추가할 때, 다음과 같이 구성. => interactive는 json 파일에 layer name으로 명시.  
        layer1.setCollisionByProperty({collides:true}); // layer1 의 tile의 collides 의 값의 충돌지정.
        this.matter.world.convertTilemapLayer(layer1);

        this.player = new player({scene:this,x:100,y:100,texture:'obj_man',frame:'townsfolk_m_idle_1'}); // matter base sprite object 생성.
        this.cameras.main.startFollow(this.player);
        // this.add.existing(this.player);
        this.player.inputKeys = this.input.keyboard.addKeys({ // input 타입은 keyboard 사용하며, 각 input의 키 값 정의.
            up : Phaser.Input.Keyboard.KeyCodes.W,
            down : Phaser.Input.Keyboard.KeyCodes.S,
            left : Phaser.Input.Keyboard.KeyCodes.A,
            right : Phaser.Input.Keyboard.KeyCodes.D,
        })
    }
    
    update(){
        this.player.update();
    }
}