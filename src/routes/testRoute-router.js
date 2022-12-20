/** test Router 추후 수정.*/
// import express from 'express';
const express = require("express");

const router = express.Router();

/**
 * node 미들웨어 -> 공통으로 사용하는 파일은 app.use 미들웨어를 사용해서 공용으로 빼둔다.  
 * 미들웨어는 반드시 next를 해주어야 다음 라우터로 넘어간다. 
*/
router.use((req, res, next) => {
  console.log("middle ware start");
  next();
});
// export {testRouteRouter};

module.exports = router;
