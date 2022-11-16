const express = require('express');
const app = express();

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.listen(7500,()=>{
    console.log("server run");
})