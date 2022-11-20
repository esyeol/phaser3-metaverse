/*
 * player 클래스를 모듈화하여 내보낸다는 의미. => 다른 js 파일에서 import 해서 가져와 사용할 수 있음.
 * 추후 소켓을 이용해 멀티스레드 환경에서 player object 들이 움직여야 하기에 다음과 같이 구상.
 * */ 
export default class player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let{scene,x,y,texture,frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} =Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false,label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,20,{isSensor:true, label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir : 0.6,
        });
        this.setExistingBody(compoundBody)


    }
    static preload(scene){
        scene.load.atlas('obj_man','resource/images/obj_man.png','resource/images/obj_man_atlas.json');
        scene.load.animation('man_anim','resource/images/obj_man_anim.json');
    }

    get velocity(){
        return this.body.velocity;
    }

    
    // player object가 갱신될 떄 마다 수행하는 함수 정의.   
    update(){
        console.log("update");
        // this.anims.play('man_idle',true); // 애니메이션 설정. 
        const speed = 5.5; // canvas 내부 object의 속도 조정. 
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
        playerVelocity.normalize(); // 
        playerVelocity.scale(speed); // player scale 설정. 
        this.setVelocity(playerVelocity.x,playerVelocity.y);

        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y)>0.1){
            this.anims.play('man_idle',true);
        }else{
            this.anims.play('man_idle',true);
        }

    }

}