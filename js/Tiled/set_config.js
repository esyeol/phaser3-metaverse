import tile_map from "./tile_map.js";

/**
 * phaser 화면 렌더링을 위한 config 설정. 
 * phaser 엔진을 그릴 영역 설정 & matter physics 엔진 적용. 
 */
const config = {
    width:1280,
    height:800,
    backgroundColor :"#999999",
    type:Phaser.AUTO,
    parent:'phaser-tutorial-prac',
    scene:[tile_map],
    scale:{
        zoom:2,
    },
    physics:
    {
        default:'matter', // aracde -> matter dafault 물리엔진 변경. 
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
new Phaser.Game(config);