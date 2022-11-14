export default class player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let{scene,x,y,texture,frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);
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
        const speed = 2.2; // canvas 내부 object의 속도 조정. 
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