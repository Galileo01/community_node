const router = require('express').Router();
const commentModel = require('../model/comment');
const PostModel = require('../model/post');

//添加 评论
router.post('/comment/add', async (req, res, next) => {
    try {
        const { post_id, email, content } = req.body;
        if (!post_id || !email || !content) return res.sendStatus(400); //参数不够
        await commentModel.create(req.body); 
        // 添加评论是同时 更新对应post 的comment_count ：评论个数加1
        const result = await PostModel.updateOne(
            { _id: post_id },
            {
                $inc: {
                    comment_count: 1,
                },
            }
        );

        res.send({
            success: result.ok,
        });
    } catch (err) {
        next(err);
    }
});

//根据post_id 获取评论

router.get('/comment/getByPost_id', async (req, res, next) => {
    try {
        const docs = await commentModel
            .find({
                post_id: req.query.post_id,
            })
            .sort({
                created_time: 1,
            });
        // console.log(doc);
        res.send({
            success: 1,
            data: docs,
        });
    } catch (err) {
        next(err);
    }
});

// 点赞、踩 评论
router.post('/comment/oprate', async (req, res, next) => {
    try {
        const { type, comment_id } = req.body;
        console.log(req.body);
        if (!type || !comment_id) return res.sendStatus(400);
        let oprate = type === 'star' ? { star_count: 1 } : { stamp_count: 1 }; //操作方式  点赞还是 踩
        const result = await commentModel.updateOne(
            { _id: comment_id },
            {
                $inc: oprate,
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
