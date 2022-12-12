/** 소켓 클라이언트에 대한 명시가 여기에 추가되어야함. */
import { I_PLAYER } from "../constants/assets.js";

export default class player {
  constructor(scene, x, y, name) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.name = name;

    //소켓서버 파트가 정해질 경우, 추가.
    // this.players = {};  // 소켓에 연결중인 player를 objecdt 형식으로 저장.

    // // 캐릭터 지정.
    this.sprite = scene.physics.add
      .sprite(this.x, this.y, I_PLAYER)
      .setSize(30, 30)
      .setOffset(10, 24);
    this.keys = scene.input.keyboard.createCursorKeys();

    this.scene.cameras.main.fadeFrom(1000);
    this.scene.physics.world.setBounds(0,0,this.scene.widthInPixels,this.scene.heightInPixels);
    this.scene.cameras.main.setBounds(0,0,this.scene.widthInPixels,this.scene.heightInPixels);
    this.scene.cameras.main.startFollow(this.sprite, true);
    this.sprite.setCollideWorldBounds(true);
    this.scene.cameras.main.centerOn(0, 0);

    // 유저의 이름을 보여주는 text 팔로우 하도록 설정.
    this.text = this.scene.add.text(x - 22, y - 45, this.name, {color: "#000000",fontStyle: "bold",});
  }

  create(){}

  left() {
    this.sprite.body.velocity.x = -300;
    this.sprite.body.velocity.y = -0;
    this.sprite.anims.play("left", true);
  }

  right() {
    this.sprite.body.velocity.x = 300;
    this.sprite.body.velocity.y = 0;
    this.sprite.anims.play("right", true);
  }

  up() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = -300;
    this.sprite.anims.play("up", true);
  }

  down() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 300;
    this.sprite.anims.play("down", true);
  }

  stop() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.anims.stop();
  }

  // 캐릭터가 이동함에 따라 값을 변경해주는 로직.
  update(direction) {
    
    const { isUp, isDown, isLeft, isRight } = direction;

    this.text.x = this.sprite.body.position.x - 22;
    this.text.y = this.sprite.body.position.y - 45;

    if (isUp) {
      this.up();
    } else if (isDown) {
      this.down();
    } else if (isLeft) {
      this.left();
    } else if (isRight) {
      this.right();
    } else {
      this.stop();
    }
  }
}
