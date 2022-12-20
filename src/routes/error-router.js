/**에러 처리를 하는 middle ware, router로 따로 빼서 사용.*/
// import express from 'express';
const express = require('express');

const router = express.Router();

//에러 미들웨어 선언 반드시 4가지 매개변수를 작성해야함. 
router.use((err,req,res,next)=>{
    console.log(err);
    res.send('ERROR!! 잠시후 다시 시도해주세요.');
});

// export {errorRouter};

module.exports = router;