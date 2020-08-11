const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/community',{useUnifiedTopology:true,useNewUrlParser:true});

mongoose.connection.once('open',()=>{
    console.log('mongodb 连接成功');
})