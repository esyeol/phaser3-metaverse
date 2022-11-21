// import Slopes from 'phaser-slopes';
// import Phaser from 'phaser';
// import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

const express = require('express');
const app = express();

app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/test'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});



app.listen(7500,()=>{
    console.log("server run");
})