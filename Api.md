
## 用户注册
- 注册成功后，**立即处于登录状态**，不用另外登录
- 成功后返回的 token ，请保存在本地，在之后的所有需要验证身份的请求头 中的 **Authorization** 字段，用户身份验证
#### 接口URL
> {{url}}/user/register

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"email": "666@",
	"password": "123456",
	"nickname": "ltt",
	"bio": "",
	"gender": 1,
	"birthday": "2020 0701"
}
```

#### 成功响应示例
```javascript
{
	"success": 1,
	"data": {
		"user": {
			"email": "666@",
			"password": "123456",
			"nickname": "ltt",
			"bio": "",
			"gender": 1,
			"birthday": "2020 0701"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjY2NkAiLCJpYXQiOjE1OTcxMTQ1ODYsImV4cCI6MTU5NzcxOTM4Nn0.teatJYZEsztCoEJu0MXANO2ZXUq98D0Ua-BS2knkpv0"
	}
}
```


#### 错误响应示例
```javascript
{
	"success": 0,
	"msg": "..."
}
```


## 用户登录

#### 接口URL
> {{url}}/user/login?email=

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| email     | - | 必填 | - |





#### 请求Body参数

```javascript
{
	"email": "ltt@",
	"password": "123456"
}
```



## 注销用户

#### 接口URL
> {{url}}/user/cancel?email=zhangliu@

#### 请求方式
> DELETE

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| email     | zhangliu@ | 必填 | - |





#### 请求Body参数

```javascript

```



## 获取用户信息
- 成功后返回的 token ，请保存在本地，在之后的所有需要验证身份的请求头 中的 **Authorization** 字段，用户身份验证
#### 接口URL
> {{url}}/user/info?email=ltt@

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| email     | ltt@ | 必填 | - |




#### 请求Header参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| Authorization     | {{token}} |  必填 | - |

#### 请求Body参数

```javascript

```

#### 成功响应示例
```javascript
{
	"success": 1,
	"data": {
		"avatar": "ltt@.jpg",
		"bio": "",
		"gender": 1,
		"state": 0,
		"_id": "5f2fe4d94e2460680886ef0b",
		"email": "ltt@",
		"nickname": "ltt",
		"birthday": "2020 0701",
		"created_time": "2020-08-09T11:58:17.733Z",
		"last_modified_time": "2020-08-09T11:58:17.733Z",
		"__v": 0
	}
}
```



## 更新用户信息

#### 接口URL
> {{url}}/user/update

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"email": "zhangsan@",
	"nickname": "zhangsan",
	"bio": "a higher boy"
}
```

#### 成功响应示例
```javascript
{
	"success": 1,
	"data": {
		"avatar": "avatar-default.png",
		"bio": "a higher boy",
		"gender": 1,
		"state": 0,
		"_id": "5f2f6ef3456eb8558868a442",
		"email": "zhangsan@",
		"nickname": "zhangsan",
		"birthday": "2020 0701",
		"created_time": "2020-08-09T03:35:15.901Z",
		"last_modified_time": "2020-08-09T03:35:15.901Z",
		"__v": 0
	}
}
```



## 更新密码

#### 接口URL
> {{url}}/user/updatepass

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"password": "123456",
	"email": "zhangsan@"
}
```



## 字段验证
用于注册时的 邮箱和昵称验证
#### 接口URL
> {{url}}/user/feildcheck?feild=nickname&value=ltt

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| feild     | nickname | 必填 | - |
| value     | ltt | 必填 | - |





#### 请求Body参数

```javascript

```



## 头像上传
- 返回的 data 为 上传的头像在服务器/本地的名称
- 通过url/public/img/avatar/xxx即可访问
#### 接口URL
> {{url}}/user/updateAvatar

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| avatar     | C:\fakepath\3822951_114058468000_2.jpg |  必填 | - |



## 获取头像

#### 接口URL
> {{url}}/public/img/avatar/ltt@.jpg

#### 请求方式
> GET

#### Content-Type
> json






#### 请求Body参数

```javascript

```



## 新建帖子

#### 接口URL
> {{url}}/post/new

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"email": "ltthz@",
	"category": 1,
	"title": "测试新建功能",
	"content": "新建帖子"
}
```



## 获取所有帖子

#### 接口URL
> {{url}}/post/get

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| email     | zhangsan@ | 必填 | - |
| category     | - | 必填 | - |
| title     | - | 必填 | - |





#### 请求Body参数

```javascript

```



## 增加查看次数

#### 接口URL
> {{url}}/post/addSeeCount

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"post_id": "5f311f166d6ba070d4edd0e7"
}
```



## 搜索帖子
**limit、offset 必传且有效**， 
结果按照，浏览次数，评论条数，创建时间，排序
#### 接口URL
> {{url}}/post/search?email=ltt&limit=10&offset=0

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| email     | ltt | 选填 | - |
| title     | - | 选填 | - |
| limit     | 10 | 必填 | - |
| offset     | 0 | 必填 | - |





#### 请求Body参数

```javascript

```



## 删除帖子

#### 接口URL
> {{url}}/post/delete?id=5f30c748d16d7661f800f984

#### 请求方式
> DELETE

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| id     | 5f30c748d16d7661f800f984 | 必填 | - |





#### 请求Body参数

```javascript

```



## 新建评论

#### 接口URL
> {{url}}/comment/add

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"post_id": "5f311f166d6ba070d4edd0e7",
	"email": "ltthz@",
	"content": "6666"
}
```



## 获取帖子的评论列表

#### 接口URL
> {{url}}/comment/getByPost_id?post_id=5f311f166d6ba070d4edd0e7

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| post_id     | 5f311f166d6ba070d4edd0e7 | 必填 | - |





#### 请求Body参数

```javascript

```



## 评论操作
type 参数：“star” ：代表点赞  ，“stamp” 代表 踩
#### 接口URL
> {{url}}/comment/oprate

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"type": "stamp",
	"comment_id": "5f314b278813304da01fbd4a"
}
```


