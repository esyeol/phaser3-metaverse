import player from "../Object/player.js";
import {Square,ClassRoom} from "../constants/scenes.js";
import {I_PLAYER, I_CLASSROOM, I_SQUARE, I_PORTAL, M_SQUARE,M_CLASSROOM,I_BOARD} from "../constants/assets.js";
import canvas from "../Ui/board.js";
import baseSene from "../../Utility/baseSene.js";
export default class classroom extends baseSene{
    constructor(){
        super(ClassRoom);
    }

    init(){
      console.log('init');
      super.init({x:300,y:300,direction:'down'});

    }

    create(){
      super.create();
        // 스퀘어로 돌아가는 함수.
        let collision = () => this.scene.start(Square); 

        // // test
        const test = () => {
            console.log('player collides!');
            const alarm = this.createSpeechBubble(board.x,board.y-50,140,50,'K 버튼을 눌러보세요');

        }

        // // event key 설정.
        // const eventKey = this.input.keyboard.addKeys('G,D');

        const map = this.make.tilemap({ key: M_CLASSROOM });
        const tileset = map.addTilesetImage("tileset_school",I_CLASSROOM,32,32,0,0);

        // collision layer define
        const spawnPoint = map.findObject("object",(obj) => obj.name === "spawn_point"); 
        const portal = map.findObject("teleport",(obj) => obj.name === "portal");
        const board = map.findObject("object",(obj) => obj.name === "board");

        // tileMap layer define
        const background = map.createLayer("background", tileset, 0, 0); 
        const interactive = map.createLayer("interactive", tileset, 0, 0); 
        const overhead = map.createLayer("overhead",tileset,0,0); 
        const location = this.physics.add.staticSprite(portal.x,portal.y,); 
        const boardLayer = this.physics.add.staticSprite(board.x+150,board.y+50);

    //    const board_test = this.physics.add.staticSprite(board.x, board.y, I_BOARD);
    //    const context_board = this.createSpeechBubble(board.x, board.y,40,50,'M 키를 눌러봐요');

        overhead.setDepth(40); // overhead layer 를 background와 interactive layer 위에 배치해서 화면상에 보이는 View가 어색하지 않도록 지정.
        
         // 각 layer 별 충돌 지정부분 활성화.
        background.setCollisionByProperty({ collides: true }); 
        interactive.setCollisionByProperty({ collides: true });

        // this.createJoystick(); // joy stick 활성화. update 이벤트는 코드 뜯어 고쳐야함.
        // this.initKeyboard(); //joystick & keyboard로 캐릭터 움직임에 대한 정의를 해둔 메서드.
    
        /** 테스트용 코드*/
        // player create
        // this.player.create();
    
      //   this.input.keyboard.on('keyup', (event) => {
      //     if (event.keyCode >= 37 && event.keyCode <= 40) {
      //         this.player.stop();
      //     }
      // });
    
    
        // this.player = new player(this, spawnPoint.x, spawnPoint.y,'아무개');
    

        // player & layer 별 충돌 지정.
        // this.physics.world.addCollider(this.player.sprite, background); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.
        // this.physics.world.addCollider(this.player.sprite, interactive); // tiled 에서 지정한 collides 충돌영역과 player object간 충돌 효과.
        // this.physics.add.collider(this.player.sprite,board_test);

            // static layer로 지정한 portal 충돌시 classroom 으로 scene 전환.
        // this.physics.add.collider(this.player.sprite,location,collision,undefined,this); 
        // this.physics.add.overlap(this.player.sprite,boardLayer,test,undefined,this);
        // this.cameras.main.startFollow(this.player.sprite); // camera follow.

        // 디버깅 모드
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

        // D 버튼 클릭시 판서 기능 활성화.
        this.input.keyboard.addListener("keydown-K",(event) => {
            document.querySelector('#board-menu').classList.remove('hidden');
            // this.draw();
            canvas();
           
        });

    }
    // update(){
    //     // this.player.update();
    //     this.player.update({
    //       isUp: this.keyboard.isUp(),
    //       isDown: this.keyboard.isDown(),
    //       isLeft: this.keyboard.isLeft(),
    //       isRight: this.keyboard.isRight(),
    //   });
    
    // }

    /**
     * obj간 충돌 했을 때, 이벤트 전달 함수.
     * @param {obj1} obj1 
     * @param {obj2} obj2
     * @return 두 obj가 겹쳤을 때 결과값을 T,F 값으로 반환.
    */
    checkCollision( obj1, obj2) {
        const bound1 = obj1.getBounds();
        const bound2 = obj2.getBounds();
    
        return Phaser.Geom.Intersects.RectangleToRectangle(bound1, bound2);
      }

        /**
   * sprite 에 bubble text 추가하는 메서드 
   * @param {x} bubble  x 좌표 
   * @param {y} bubble  y 좌표
   * @param {width} bubble width
   * @param {hegiht} bubble hegiht 
   * @param {quote} buuble content 
  */

  createSpeechBubble (x, y, width, height, quote)
  {
      const bubbleWidth = width;
      const bubbleHeight = height;
      const bubblePadding = 10;
      const arrowHeight = bubbleHeight / 4;
  
      const bubble = this.add.graphics({ x: x, y: y });
  
      //  Bubble shadow
      bubble.fillStyle(0x222222, 0.5);
      bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);
  
      //  Bubble color
      bubble.fillStyle(0xffffff, 1);
  
      //  Bubble outline line style
      bubble.lineStyle(4, 0x565656, 1);
  
      //  Bubble shape and outline
      bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
      bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  
      //  Calculate arrow coordinates
      const point1X = Math.floor(bubbleWidth / 7);
      const point1Y = bubbleHeight;
      const point2X = Math.floor((bubbleWidth / 7) * 2);
      const point2Y = bubbleHeight;
      const point3X = Math.floor(bubbleWidth / 7);
      const point3Y = Math.floor(bubbleHeight + arrowHeight);
  
      //  Bubble arrow shadow
      bubble.lineStyle(4, 0xffffff, 0.5);
      bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);
  
      //  Bubble arrow fill
      bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
      bubble.lineStyle(2, 0x565656, 1);
      bubble.lineBetween(point2X, point2Y, point3X, point3Y);
      bubble.lineBetween(point1X, point1Y, point3X, point3Y);
  
      const content = this.add.text(0, 0, quote, { fontFamily: 'Arial', fontSize: 10, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding) } });
  
      const b = content.getBounds();
  
      content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
  }

  /**joystick & keyboard set*/
  // initKeyboard() {
  //   const cursorKeys = this.input.keyboard.createCursorKeys();
  
  //   this.keyboard = {
  //       cursorKeys,
  //       isUp: () => {
  //           return this.joystick.up || cursorKeys.up.isDown;
  //       },
  //       isLeft: () => {
  //           return this.joystick.left || cursorKeys.left.isDown;
  //       },
  //       isDown: () => {
  //           return this.joystick.down || cursorKeys.down.isDown;
  //       },
  //       isRight: () => {
  //           return this.joystick.right || cursorKeys.right.isDown;
  //       },
  //   };
  // }
    /**
     * joystick 생성을 위한 초기화 메서드
     * joystick의 이벤트와 모양, 크기 등을 지정
     */
    // createJoystick() {
    //   console.log("create joyStick");
    //   this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
    //     x: 0,
    //     y: 0,
    //     radius: 50,
    //     base: this.add.circle(0, 0, 50, 0x888888, 0.6).setDepth(1),
    //     thumb: this.add.circle(0, 0, 25, 0xcccccc, 0.8).setDepth(1),
    //     dir: "4dir",
    //   });
    //   this.joystick.setVisible(false);
    //   this.input.on("pointerup", () => {
    //     if (!this.isInteracting) {
    //       this.joystick.setVisible(false);
    //     }
    //   });
    //   this.input.on("pointerdown", (pointer) => {
    //     if (!this.isInteracting) {
    //       this.joystick.setPosition(pointer.x, pointer.y);
    //       this.joystick.update();
    //       this.joystick.setVisible(true);
    //     }
    //   });
    // }


    
}