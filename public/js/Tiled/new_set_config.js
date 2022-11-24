import tile_map from "./new_tile_map.js";
// import classroom from "./classroom.js";

/**
 * phaser 화면 렌더링을 위한 config 설정. 
 * phaser 엔진을 그릴 영역 설정 & arcade physics 엔진 적용. 
 */
const config = {
    width:1550,
    height:1000,
    backgroundColor :"#94A3B8", //#94A3B8
    type:Phaser.AUTO,
    pixelArt: true,
    parent:'phaser-tutorial-prac', 
    scene:[tile_map], // define preload,create,update.
    scale:{
        zoom:1,
    },
    physics:
    {
        default:'arcade', // matter -> aracde 변경 
        arcade:{
            debug:false, // debug 모드 비활성화. 
            gravity:{y:0}, 
        },
    },
}
new Phaser.Game(config);