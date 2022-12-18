import baseSene from "../../Utility/baseSene.js";
import {I_PLAYER, I_CLASSROOM, I_SQUARE, I_PORTAL, M_SQUARE} from "../constants/assets.js";
import {Square,ClassRoom} from "../constants/scenes.js";

export default class square extends baseSene {  

  constructor() {
    super(Square);
  }

  // 캐릭터에 대한 객체 선언은 여기서 진행
  init(data) {
    console.log(`data: ${data}`);
    // this.player = new Player(this, this.key, this.getPosition(data));
    super.init(this.getPosition(data));
    console.log(`data position : ${this.getPosition(data)}`);  
  }


  /**baseSene 에서 상속받아 캐릭터 생성 및 맵 말단 생성.*/
  create() {
    console.log("create");

    super.create(M_SQUARE,I_SQUARE);
   
  }

  registerCollision() {
    console.log('regiseterCollision');

    let player = this.player.players[this.player.socket.id];
  
    this.createSpeechBubble(this.portal.x, this.portal.y-90, 100, 50, '클래스룸에 입장해주세요');

    // player & layer 별 충돌 지정.
    this.physics.world.addCollider(player, this.background);
    this.physics.world.addCollider(player, this.interactive);

    
  //   this.add.text(16, 16, "press 'D' you can use debug mode", {
  //     font: "18px monospace",
  //     fill: "#000000",
  //     padding: { x: 20, y: 10 },
  //     backgroundColor: "#ffffff", // #00ff0000 -> rgb 투명.
  //   })
  //   .setScrollFactor(0);

  // // debuging mode -> phaser에서 제공하는 디버깅 함수(테스트에서만 사용)
  // this.input.keyboard.once("keydown-D", (event) => {
  // this.physics.world.createDebugGraphic();

  //   // Create worldLayer collision graphic above the player, but below the help text
  //   const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);

  //   this.background.renderDebug(graphics, {
  //     tileColor: null,
  //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
  //     faceColor: new Phaser.Display.Color(40, 39, 37, 255),
  //   });

  //   this.interactive.renderDebug(graphics, {
  //     tileColor: null,
  //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
  //     faceColor: new Phaser.Display.Color(40, 39, 37, 255),
  //   });
  // });
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


// this.spawnPoint 로 나중에 테스트.
getPosition(data) {
      return { x:800, y:800, direction: 'down' };
}

}