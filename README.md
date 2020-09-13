# community_node
一个技术交流社区，第一个node项目

## 开发模式
**使用Vue + Node 前后端分离**，没有采用视频中的 服务端渲染，个人觉得既然会Vue 还是分离开比较好，后端就只负责 返回数据  
前端页面仓库 [见](https://github.com/Galileo01/community_vue)


## 特点
- Vue+Node 完全的前后端分离
- 使用jwt 代替视频中的Session 方式
使用token 不需要在服务器存储用户的登录状态，获取token 时候就可以立即判断身份是否有效、登录是否过期等，比较简单  
并编写了专门用于验证token的 中间件，在路由处理之前挂载，如果没有通过验证，立即返回状态码 401，
```js
function verifyMiddleware(req, res, next) {
    //登录 和注册请求直接跳过
    if (req.url.startsWith('/user/login') || req.url.startsWith('/user/register'))
        return next();
    const token = req.headers.authorization;
    if (!token)// 请求头没有  authorization 字段
        return res.status(401).send({
            success: 0,
            msg: 'token 过期请重新登录',
        });
    jwt.verify(token, secret, (err,payload) => {
        if (err) {
            return res.status(401).send({
                success: 0,
                msg: 'token 过期请重新登录',
            });
        } else {
            console.log(`${payload.email} 发来请求`);
            next();
        }
    });
}
```
- express 路由处理使用 async/await
利用 **async/await** 已同步代码的形式书写异步代码，代码结构更简洁，易懂，容易维护


-  使用正则表达式 完成了帖子搜索的 功能
通过email 和title 可以搜索 帖子，并按照 浏览次数，评论条数，创建时间降序排序

- 完成头像上传功能
 使用multer 中间件 ，获取用户通过表单上传的图片，保存到本地
<<<<<<< HEAD

- 帖子发布使用 markdown 在线预览
使用 marked.js 在线编辑md文件，直接预览，  
是md 格式的字符串 存储到数据库 ，返回到帖子详情页，渲染
