import tile_map from "./new_tile_map.js";

/**
 * phaser 화면 렌더링을 위한 config 설정. 
 * phaser 엔진을 그릴 영역 설정 & matter physics 엔진 적용. 
 */
const config = {
    width:1200,
    height:800,
    backgroundColor :"#999999",
    type:Phaser.AUTO,
    pixelArt: true,
    parent:'phaser-tutorial-prac', 
    scene:[tile_map], // define preload,create,update.
    scale:{
        zoom:2,
    },
    physics:
    {
        default:'arcade', // aracde -> matter dafault 물리엔진 변경. 
        arcade:{
            debug:false,
            gravity:{y:0}, // x,y 축으로 자동으로 이동
        },
    },
}
new Phaser.Game(config);