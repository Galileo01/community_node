const express = require('express');
const path = require('path');
const router = require('./router')
const app = express();
const { verifyMiddleware } = require('./commonjs/JWT')
app.use('/public', express.static('./public'));

//允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
// 挂载 token 验证中间件
app.use(verifyMiddleware);

//以中间件的形式 挂载路由
app.use(router);

//挂载 自定义的 全局  错误处理中间件
app.use((err, req, res, next) => {
    console.log('log in err-middleware:', err);
    res.sendStatus(500);
})
//连接数据库
require('./commonjs/mongodb_connect')

// app.get('/',(req,res)=>{
//    res.render('index.html')
// })



app.listen(8080, (err) => {
    console.log('running ');
})