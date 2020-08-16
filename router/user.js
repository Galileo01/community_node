//处理 登录注册，注销 路由
const path = require('path');
const express = require('express');
const router = express.Router(); //引入 express Router 中间件，模块化路由
const md5 = require('blueimp-md5');
const multer = require('multer');

const UserModel = require('../model/user');
const { signToken } = require('../commonjs/JWT');
//解析 post 参数
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/avatar'),
    filename(req, file, cb) {
        cb(null, req.email + path.parse(file.originalname).ext); //使用 文件 本来的后缀名,命名统一，保证 头像只有一张
    },
});
const upload = multer({ storage });

//用户注册
/* 
如果存在，则不允许注册
不存在 就存在

*/
router.post('/user/register', async (req, res, next) => {
    console.log('body', req.body);
    const { email, nickname } = req.body;
    // req.body.password = md5(req.body.password); //测试阶段需要用md5
    //查找邮箱 或者昵称 是否存在相同的 用户
    try {
        const doc = await UserModel.findOne({ $or: [{ email, nickname }] });
        console.log('doc', doc);
        if (doc)
            return res.send({
                success: 0,
                msg: '邮箱或昵称已存在',
            });

        await UserModel.create(req.body);
        //注册成功后默认登录， ，前端控制页面跳转
        const token = signToken({ email });
        console.log(token);
        res.send({
            success: 1,
            data: { userinfo: req.body, token },
        });
    } catch (err) {
        next(err);
    }
});

//注册时 进行邮箱，昵称 单个字段的 预验证
router.get('/user/feildcheck', async (req, res, next) => {
    const { feild, value } = req.query;
    console.log(feild, value);
    let filter;
    if (feild === 'email') {
        filter = { email: value };
    } else if (feild === 'nickname') {
        filter = {
            nickname: value,
        };
    }
    try {
        const doc = await UserModel.findOne(filter);
        if (doc) {
            res.send({
                success: 1,
                found: 1,
            });
        } else {
            res.send({
                success: 0,
                found: 0,
            });
        }
    } catch (err) {
        next(err);
    }
});
//登录
router.post('/user/login', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const doc = await UserModel.findOne(
            {
                email,
                password: password,
            },
            {
                password: false,
            }
        );
        if (!doc) {
            res.send({
                success: 0,
                msg: '用户名或密码错误',
            });
        } else {
            const token = signToken({ email });
            res.send({
                success: 1,
                data: { userinfo: doc, token },
            });
            console.log(`${email} 登录`);
        }
    } catch (err) {
        next(err);
    }
});

// 获取用户信息
router.get('/user/info', async (req, res, next) => {
    const email = req.query.email;
    try {
        const doc = await UserModel.findOne(
            { email },
            {
                password: false,
            }
        );
        if (!doc)
            return res.send({
                success: 0,
                msg: '查找失败,用户不存在',
            });
        res.send({
            success: 1,
            data: doc,
        });
    } catch (err) {
        next(err);
    }
});

//更新用户信息
router.post('/user/update', async (req, res, next) => {
    console.log(req.body);
    try {
        const result = await UserModel.updateOne(
            { email: req.body.email },
            {
                $set: req.body,
            }
        );
        console.log(result);
        if (result.n + result.nModified === 2) {
            res.send({
                success: 1,
                data: await UserModel.findOne(
                    { email: req.body.email },
                    '-password'
                ),
            });
        } else if (result.n === 1 && result.nModified === 0) {
            res.send({
                success: 0,
                msg: '信息未更改',
            });
        } else
            res.send({
                success: 0,
                msg: '更新失败',
            });
    } catch (err) {
        next(err);
    }
});

//更改密码
router.post('/user/updatepass', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await UserModel.updateOne(
            { email },
            {
                $set: { password },
            }
        );
        if (result.n + result.nModified === 2) {
            res.send({
                success: 1,
                data: await UserModel.findOne(
                    { email: req.body.email },
                    '-password'
                ),
            });
        } else
            res.send({
                success: 0,
                msg: '更新失败',
            });
    } catch (err) {
        next(err);
    }
});
//注销用户
router.delete('/user/cancel', async (req, res, next) => {
    console.log(req.query);
    try {
        const result = await UserModel.deleteOne({ email: req.query.email });
        console.log(result);
        if (result.deletedCount === 1) {
            res.send({
                success: 1,
            });
        } else
            res.send({
                success: 0,
                msg: 'delete failed',
            });
    } catch (err) {
        next(err);
    }
});

// 上传 头像
router.post(
    '/user/updateAvatar',
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            // console.log(req.file);
            const file = req.file;
            console.log(file);
            if (file) {
                //同时更新 users 数据库 当前用户的 avatar
                const result = await UserModel.updateOne(
                    { email: req.email },
                    {
                        $set: {
                            avatar: file.filename,
                        },
                    }
                );
                if (result.ok)
                    res.send({
                        success: 1,
                        data: file.filename,
                    });
                else
                    res.end({
                        success: 0,
                    });
            } else {
                res.end({
                    success: 0,
                });
            }
        } catch (err) {
            next(err);
        }
    }
);
module.exports = router;
