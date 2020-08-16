const jwt = require('jsonwebtoken');
const secret = 'community'; //密钥

//签发token
function signToken(data, expiresIn = '7d') {
    //默认 7天的 有效期
    return jwt.sign(data, secret, {
        expiresIn,
    });
}

//验证token
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject([err, null]);
            } else resolve([null, payload]);
        });
    });
}

// 验证token 中间件
function verifyMiddleware(req, res, next) {
    //登录 和注册请求直接跳过\
    const excludes = ['/user/login', '/user/register', '/post/search', '/post/get', '/public', '/user/feildcheck'];
    for (const path of excludes) {
        if (req.url.startsWith(path)) return next();
    }
    // 排除OPTIONS 请求，
    if (req.method === 'OPTIONS')
        return next();
    // console.log(req.url);
    const token = req.headers.authorization;
    if (!token)
        // 请求头没有  authorization 字段
        return res.status(401).send({
            success: 0,
            msg: 'token 过期请重新登录',
        });
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            return res.status(401).send({
                success: 0,
                msg: 'token 过期请重新登录',
            });
        } else {
            console.log(`${payload.email} 发来请求`);
            req.email = payload.email; //向req 添加 用户信息
            next();
        }
    });
}

module.exports = {
    signToken,
    verifyToken,
    verifyMiddleware,
};
