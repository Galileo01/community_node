const router = require('express').Router();
const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter=require('./comment')
router.use([userRouter, postRouter,commentRouter]);

module.exports = router;
