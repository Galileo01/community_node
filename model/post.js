const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    category: {
        type: Number,
        enum: [0, 1, 2, 3], // 分享，问答，招聘，测试
        default: 0,
    },
    title: {
        type: String,
        required: true
    },
    //v2 ：改进过的 content 是md 格式的字符串，返回到前端直接渲染
    content: {
        type: String,
        default: '',
    },
    created_time: {
        type: Date,
        default: Date.now,
    },
    //评论 数量
    comment_count: {
        type: Number,
        default: 0,
    },
    //浏览次数
    see_count: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('posts', postSchema);
