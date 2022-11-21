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
        
        //player(유저) 스폰을 tiled tool 에서 script로 지정할지 코드에서 하드 코딩으로 지정할지 고려. 

        this.players = new players(this, 700, 700); // player object 생성.
        layer1.setCollisionByProperty({collides:true}); // tiled 툴에서 background layer의 collides 영역 활성화. 
        this.physics.world.addCollider(this.players.sprite,layer1); 
        // layer2.setCollisionByProperty({collides:true}); // tiled 툴에서 interactive layer의 collides 영역 -> 추후 활성화시 사용.
        
        this.cameras.main.startFollow(this.players.sprite);

    }
    update(){
        this.players.update();

    }




}