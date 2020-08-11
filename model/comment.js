const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: '',
    },
    created_time: {
        type: Date,
        default: Date.now,
    },
    //点赞数目
    star_count: {
        type: Number,
        default: 0,
    },
    //踩的数目
    stamp_count: {
        type: Number,
        default: 0,
    },
});


module.exports=mongoose.model('comments',commentSchema);