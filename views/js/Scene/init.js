import { UP, LEFT, DOWN, RIGHT } from "../constants/direction.js";
import {I_PLAYER, I_CLASSROOM, I_SQUARE, I_PORTAL, M_SQUARE, M_CLASSROOM,I_BOARD} from "../constants/assets.js";
import { Square,INIT } from "../constants/scenes.js";
// import {socket} from "../Socket/connection.js";



export default class Init extends Phaser.Scene {
    constructor()
    {
        super({ key: INIT });
        this.progressBar = null;
        this.progressCompleteRect = null;
        this.progressRect = null;
    }

    /** 메타버스 화면 랜더링에 사용될 모든 리소스를 정의 & 리소스 가져오는 preload */
    preload(){

       // plugin load
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

        // spriteSheet 
        this.load.spritesheet(I_SQUARE, "resource/sprite/hs_tiles_source.png",{frameWidth: 128,frameHeight: 64,}); // 광장
        this.load.spritesheet(I_CLASSROOM, "resource/images/tileset_school.png",{frameWidth: 128,frameHeight: 64,}); // 클래스룸 
        this.load.spritesheet(I_PORTAL, "resource/sprite/portal_128.png", {frameWidth: 128,frameHeight: 64,}); // 이동 포털
        this.load.spritesheet(I_PLAYER, 'resource/sprite/man-3.png', { frameWidth: 32, frameHeight: 42 }); // 캐릭터 + 해당 부분은 추후 API 서버에서 지정한 값으로 교체해야함
        // this.load.spritesheet(I_BOARD,'resource/sprite/board.png', { frameWidth: 32, frameHeight: 42 });


        // tilemapJson 
        this.load.tilemapTiledJSON(M_SQUARE, "resource/tileset/hs_main_map.json"); //광장
        this.load.tilemapTiledJSON(M_CLASSROOM, "resource/tileset/room.json"); //클래스룸

        //load progress
       this.load.on('progress', this.onLoadProgress, this);
       this.load.on('complete', this.onLoadComplete, this);
       this.createProgressBar();    
    }

    create(){

        /** 캐릭터 애니메이션에 대한 부분 정의.*/ 
        this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers(I_PLAYER, {  start: 0, end: 3 }),
			frameRate: 12,
			repeat: -1
		});

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(I_PLAYER, {  start: 4, end: 7 }),
			frameRate: 12,
			repeat: -1
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(I_PLAYER, {  start: 8, end: 11  }),
			frameRate: 12,
			repeat: -1
		});

        this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers(I_PLAYER, {  start: 12, end: 15  }),
			frameRate: 12,
			repeat: -1
		});
    }
    
    //load ProgressBar
    createProgressBar() {
        let Rectangle = Phaser.Geom.Rectangle;
        let main = Rectangle.Clone(this.cameras.main);

        this.progressRect = new Rectangle(0, 0, main.width, 50);
        Rectangle.CenterOn(this.progressRect, main.centerX, main.centerY);

        this.progressCompleteRect = Phaser.Geom.Rectangle.Clone(this.progressRect);
        
        this.add.text(main.centerX-50,main.centerY-150,"입장중...",{
            font: "40px Bold",
            fill: "#000000",
            align: "center"
        });

        this.progressBar = this.add.graphics();
    }

    /**리소스를 정상적으로 가져온 이후, Square로 이동 하고, Init Scene 종료.*/ 
    onLoadComplete(loader) {
        
        this.scene.start(Square);
        this.scene.shutdown();
    }

    onLoadProgress(progress) {
        let color = (0xffffff);
        this.progressRect.width = progress * this.progressCompleteRect.width;
        this.progressBar
            .clear()
            .fillStyle(0x222222)
            .fillRectShape(this.progressCompleteRect)
            .fillStyle(color)
            .fillRectShape(this.progressRect);
    }
}