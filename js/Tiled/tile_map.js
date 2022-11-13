/**
 * phaser default map set 
 */
export default class tile_map extends Phaser.Scene{
    constructor(){
        super("tile_map");
    }

    // phaser game 시작시, 구성하는 asset 을 load 하는데 사용. 
    preload(){
        console.log("preload");
    }
    
    // phaser 내부에서 게임 개체를 만드는데 사용. 
    create(){
        console.log("create");
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world); // matter base sprite object 생성. 
        this.inputKeys = this.input.keyboard.addKeys({ // input 타입은 keyboard 사용하며, 각 input의 키 값 정의.
            up : Phaser.Input.Keyboard.KeyCodes.W,
            down : Phaser.Input.Keyboard.KeyCodes.S,
            left : Phaser.Input.Keyboard.KeyCodes.A,
            right : Phaser.Input.Keyboard.KeyCodes.D,
        })
    }
    
    // 장면이 업데이트 될때마다 콜백되는 함수. 
    update(){
        console.log("update");
        const speed = 2.0; // canvas 내부 object의 속도 조정. 
        let playerVelocity = new Phaser.Math.Vector2(); // 2D 공간에서 백터 표현을 위한 phaser 자체 클래스 ver3,4 까지 있음. 
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
        }else if(this.inputKeys.right.isDown){
            playerVelocity.x = 1; 
        }

        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        }else if(this.inputKeys.down.isDown){
            playerVelocity.y = 1; 
        }

        playerVelocity.scale(speed); // player scale 설정. 
        this.player.setVelocity(playerVelocity.x,playerVelocity.y);


    }
}