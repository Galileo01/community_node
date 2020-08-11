const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_time: {
        type: Date,
        default: Date.now, // 不立即执行,创建时调用  MARK:
    },
    last_modified_time: {
        type: Date,
        default: Date.now,
    },
    avatar:{
        type: String,
        default:'/avatar-default.png'
    },
    //个人简介
    bio:{
        type: String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1],//规定 性别可选值
        default:-1
    },
    birthday:{
        type: String,
    },
    state:{
        type:Number,
        /*
        0 没有限制
        1 不能评论
        2 不能登录
        */
        enum:[0,1,2],
        default:0
    }

});

module.exports = mongoose.model('users', userSchema);
