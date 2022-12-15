import Player from "../js/Object/players.js";

export default class baseSene extends Phaser.Scene {
  constructor(key) {
    super({ key });
    this.key = key;
  }

  // player obj 생성 & 위치 & scene 전환에 필요한 key 값등을 정의.
  init(position) {
    this.scene.setVisible(false, this.key);
    // this.scene.setVisible(false,this.key);
    this.player = new Player(this, this.key, position);
    this.transition = true;
    this.input.keyboard.removeAllListeners();
  }

  // keyboard & joystick에 대한 키 값을 정의.
  initKeyboard() {
    const cursorKeys = this.input.keyboard.createCursorKeys();

    this.keyboard = {
      cursorKeys,
      isUp: () => {
        return this.joystick.up || cursorKeys.up.isDown;
      },
      isLeft: () => {
        return this.joystick.left || cursorKeys.left.isDown;
      },
      isDown: () => {
        return this.joystick.down || cursorKeys.down.isDown;
      },
      isRight: () => {
        return this.joystick.right || cursorKeys.right.isDown;
      },
    };
  }

  // /**
  //  * @param {tileMap} 화면에 랜더링 할 json 파일 set
  //  * @param {tileSet } tileMap 제작에 사용되는 images 파일 set
  //  * @param {animation} 별도로 추가할 애니메이션에 대한 정의. 사용안 할 경우 false 지정.
  // */
  create() {
    console.log("super create");

    //소켓연결
    this.player.create();
    console.log(`${this.player}`);
    console.log(`${this.player.players[this.id]}`);
    console.log(`${this.player.players[this.player.socket.id]}`);

    this.cameras.main.on("camerafadeincomplete", () => {
      this.transition = false;
      this.input.keyboard.on("keyup", (event) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          this.player.stop();
        }
      });
      this.registerCollision();
    });
    this.createJoystick();
    this.initKeyboard();
  }

  registerCollision() {
    throw new Error("registerCollision() not implemented");
  }

  /**initial create joystick */
  createJoystick() {
    console.log("create joyStick");
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 0,
      y: 0,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888, 0.6).setDepth(1),
      thumb: this.add.circle(0, 0, 25, 0xcccccc, 0.8).setDepth(1),
      dir: "4dir",
    });
    this.joystick.setVisible(false);
    this.input.on("pointerup", () => {
      if (!this.isInteracting) {
        this.joystick.setVisible(false);
      }
    });
    this.input.on("pointerdown", (pointer) => {
      if (!this.isInteracting) {
        this.joystick.setPosition(pointer.x, pointer.y);
        this.joystick.update();
        this.joystick.setVisible(true);
      }
    });
  }

  update() {
    if (this.transition === false) {
      this.player.update({
        isUp: this.keyboard.isUp(),
        isDown: this.keyboard.isDown(),
        isLeft: this.keyboard.isLeft(),
        isRight: this.keyboard.isRight(),
      });
    }
  }
}
