const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

// router 설정.
const testRouter = require('./src/routes/testRoute-router');
const mainRouter = require('./src/routes/main-router'); 
// const configRouter = require('./src/routes/config-router');
const errRouter = require('./src/routes/error-router');
const nFoundRouter = require('./src/routes/notFound-router');

const app = express(); 

app.set('port',process.env.PORT || 7500); 
app.set('view engine','html');


nunjucks.configure('views',{
    express: app,
    watch: true,
});


app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/dist')));

// 라우터 정의. 
app.use(testRouter);
app.use('/',mainRouter);
app.use(nFoundRouter);
app.use(errRouter);


app.listen(app.get('port'),()=>{
    console.log('metaverse server run');
});


