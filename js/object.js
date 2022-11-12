/**
 * phaser 화면 렌더링을 위한 config 설정. 
 * phaser 엔진을 그릴 영역 설정 & matter physics 엔진 적용. 
 */
const config = {
    width:800,
    hegiht:800,
    backgroundColor :"#333333",
    type:Phaser.AUTO,
    parent:'phaser-tutorial-prac',
    scence:[],
    scale:{
        zoom:2,
    },
    physics:
    {
        default:'matter',
        matter:{
            debug:true,
            gravity:{y:0},
        }
    },
    plugins:{
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'

            }
        ]
    }
}