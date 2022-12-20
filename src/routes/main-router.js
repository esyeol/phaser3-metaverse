/**public,dist 폴더에서 프론트 작업물을 처리하는 router*/
// import express from 'express';
const express = require('express');

const router = express.Router();

let jwt;
/**
 * client 요청 형식을 body 담아서 해야함.
 * fetch("/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        key: {
            jwt: "token_content",
        },
    }),
});
*/
router.get('/',(req,res)=>{
    console.log(res.body);
    // res.setHeader("Set-Cookie",`token=${token}`);
    // res.cookie('jwt','test');
    // console.log(req.cookies);
    res.render("index.html");
    // res.sendFile(__dirname,'/index.html');

    //메인에서 클라이언트에서 넘어온 데이터를 파싱하는 json, urlencoded를 선언 했기 때문에, 아래와 같이 사용할 수 있음.
    // console.log(req.body.key.name);  // 이렇게 하면 JWT 토큰값 추출 할 수 있음. 이후 진섭님 코드 require 해서 사용.
});

//라우터에서 전송 받은 데이터 파싱.
router.post('/',(req,res)=>{
    // console.log(`전송 받은 토큰 값 : ${req.body}`);
    console.log(`전송 받은 토큰 값 : ${req.body}`);
    console.log(`전송 받은 토큰 값 : ${req.body.key}`);
    try{
        jwt=atob(req.body.key);
        console.log(`토큰 식별`);
    }catch(e){
        console.log(`잘못된 토큰 값:${e}`);
    }
    let jwtArr = jwt.split('.');
    let payLoad=JSON.parse(jwtArr[1]);
    console.log(`토큰 정보 : ${payLoad}`);
    console.log(`토큰 정보 : ${payLoad.User_ID}`);
    console.log(`토큰 정보 : ${payLoad.User_ID}`);
    console.log(`토큰 정보 : ${atob(payLoad.User_ID)}`);
    
    // if(jwt !=""){
    //     let jwtArr = jwt.split('.');
    //     let payLoad=JSON.parse(jwtArr[1]);
    //     console.log(`토큰 정보 : ${payLoad}`);
    // }

    res.json(req.body);
    // res.setHeader("Set-Cookie",`token=${token}`);
});

router.get('/square',(req,res)=>{
    res.render("square.html");
});

module.exports = router;
// export{mainRouter};