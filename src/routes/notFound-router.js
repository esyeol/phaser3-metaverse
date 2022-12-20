/**router에 지정한 경로가 없을 때, 발생하는 404 에러를 처리하기 위한 router*/
// import express from 'express';
const express = require('express');


const router = express.Router();

/**
 * 404 에러 처리를 하기 위한 미들웨어
 * 에러 미들웨어 바로 위에 다음과 같은 형태로 사용한다.
 * 위 router에서 모든 요청을 조회했을 때, 나오는 값이 없으니까 404 에러라고 판단하고 반환.
*/
router.use((req,res,next)=>{
    res.status(404).send('404 ERROR!');
});

// export {notFound};

module.exports = router;




