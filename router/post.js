//处理 帖子
const router = require('express').Router();
const PostModel = require('../model/post');
const UserModel = require('../model/user')

//发布帖子
router.post('/post/new', async (req, res, next) => {
    const { email } = req.body;
    if (!email) return res.sendStatus(400);
    try {
        const { avatar } = await UserModel.findOne({ email })
        const doc = await PostModel.create({
            ...req.body,
            avatar
        });
        console.log(doc);
        res.send({
            success: 1,
            data:doc.id
        });
    } catch (err) {
        next(err);
    }
});
//获取 帖子
router.get('/post/get', async (req, res, next) => {
    try {
        console.log(req.query);
        const { offset, limit, email, _id } = req.query;
        const filter = {};
        if (email)
            filter.email = email;
        if (_id)
            filter._id = _id;
        const posts = await PostModel.find(filter)
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .sort({ see_count: -1, comment_count: -1, created_time: -1 }); //按照 浏览次数，评论条数，创建时间排序
        const total = await PostModel.countDocuments();
        res.send({
            success: 1,
            data: {
                posts,
                total
            },
        });
    } catch (err) {
        next(err);
    }
});

// 根据 email ，title，搜索帖子  使用 正则
router.get('/post/search', async (req, res, next) => {
    try {
        console.log(req.query);
        const { email, title, offset, limit } = req.query;
        if (!email && !title) res.sendStatus(400);
        const posts = [];
        //匹配email 包含该字符串  的文档
        if (email) {
            const docs = await PostModel.find({ email: { $regex: email } });
            posts.push(...docs);

        }
        //匹配title 包含该字符串  的文档
        if (title) {
            const docs = await PostModel.find({ title: { $regex: title } });
            posts.push(...docs.filter(doc => !posts.find(item => item.id === doc.id)));//过滤 之前通过eamil 正则匹配存在的 post
        }
        const total = posts.length;
        res.send({
            success: 1,
            data: {
                posts: posts.splice(offset, limit),
                total
            },
        });
    } catch (err) {
        next(err);
    }
});

//删除 帖子
router.delete('/post/delete', async (req, res, next) => {
    if (!req.query.id) return res.sendStatus(400);
    try {
        const result = await PostModel.deleteOne({ _id: req.query.id });
        console.log(result);
        if (result.ok)
            res.send({
                success: 1,
            });
        else
            res.send({
                success: 0,
                msg: '删除失败',
            });
    } catch (err) {
        next(err);
    }
});

// 增加帖子的查看次数
router.post('/post/addSeeCount', async (req, res, next) => {
    try {
        const result = await PostModel.updateOne(
            { _id: req.body.post_id },
            {
                $inc: {
                    see_count: 1,
                },
            }
        );
        console.log(result);
        res.send({
            success: result.ok,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
