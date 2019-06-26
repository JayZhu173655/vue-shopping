##服务端是根据别的改
###服务端没有使用数据库，是使用node的文件读写模块fs模拟的
###后台接口服务会打包放入前端项目文件夹下，解压后安装依赖npm start运行就可以了
####后台服务主机和端口号：'http://localhost:3003' 后面请求接口省略主机名和端口号'
####获取home页面的轮播图
```
请求接口：'/api/swipe'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    swipeList: [
        {
            id: 1,
            img: 'http://localhost:3001/api/images/swipe/02.jpg',
            url: '/home/photoinfo/41'
        }
    ]
}
失败的返回结果：
{
    success: false,
    msg: '请求数据失败！'
}
```

####获取home页面的菜单信息
```
请求接口：'/api/nav'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    navList: [
        {
            id: 1,
            img: 'http://localhost:3001/api/images/nav/news.png',
            url: '/home/newslist',
            title: '新闻资讯'
        }
    ]
}
失败的返回结果：
{
    success: false,
    msg: '请求数据失败！'
}
```

####获取/home/newslist页面的新闻列表
```
请求接口：'/api/newslist'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    newsList: [
        {
            id: 1,
            title: 'layui复选框如何设置未选中返回值',
            add_time: '2019-06-25 12:45:25',
            click: 1,
            img: 'http://localhost:3001/api/images/newslist/1.jpg',
            url: '/home/newsinfo'
        }
    ]
}
失败的返回结果：
{
    success: false,
    msg: '请求数据失败！'
}
```

####获取/home/newsinfo/:id页面的新闻详情
```
请求接口：'/api/newslist/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    details: [
        {
            id: 1,
            title: 'layui复选框如何设置未选中返回值',
            add_time: '2019-06-25 12:45:25',
            click: 1,
            content: '<h4>新闻内容</h4><img src='http://localhost:3001/api/images/test/test1.jpg' alt='大话西游'/><p>应朝鲜劳动党委员长、朝鲜民主主义人民共和国国务委员会委员长金正恩邀请，当地时间6月20日11时40分许，中共中央总书记、国家主席习近平乘坐专机抵达朝鲜首都平壤，开始对朝鲜进行国事访问。</p>'
        }
    ]
}
失败的返回结果：
{
    success: false,
    msg: '请求数据失败！'
}
```
###项目中所有获取评论和提交评论都是一样的接口
####获取/home/newsinfo/:id页面对应的评论
```
请求接口：'/api/getcomments/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    details: [
        {
            id: 1,
            user_name: '洛米杠A',
            add_time: '2019-06-25 12:45:25',
            content: '初学者推荐用notepad++编辑代码，我也是学java的，用notepad++能让你熟记代码，熟练之后再用编辑器比较好'
        }
    ]
}
失败的返回结果：
{
    success: false,
    msg: '请求数据失败！'
}
```

####提交/home/newsinfo/:id页面的评论
```
请求接口：'/api/getcomments/:id'
请求方式：'POST'
传入参数：{
        content: '评论内容'
    }
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
    msg: '评论成功'
}
失败的返回结果：
{
    success: false,
    msg: '评论失败！'
}
```
####请求/home/photolist页面顶部导航的列表
```
请求接口：'/api/getcategory'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "categoryList": [
           {
               "title": "家居生活",
               "id": 1
           }
   ]        
}
失败的返回结果：
{
    success: false,
    msg: '获取列表信息失败！'
}
```
####请求/home/photolist页面中导航对应的图片列表
```
请求接口：'/api/getphotos/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "photoList": [
           
           {
               "id": 239,
               "title": "涂鸦文化 家居生活的新方式",
               "url": "../../api/images/photolist/1/19.jpg",
               "summary": "随性、自由的涂鸦文化，藉由对设计艺术的新启发，以及时尚工业的发展，成为一种备受关注的美学现象，摇身变为主流时尚文化之一。"
           }
   ]        
}
失败的返回结果：
{
    success: false,
    msg: '获取图片列表信息失败！'
}
```
####请求/home/photoinfo/:id页面图片详细信息
```
请求接口：'/api/getphotoinfo/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "photoInfo":{
           "id": 21,
           "title": "这是图片详情标题这是图片详情标题这是图片详情标题这是图片详情标题",
           "click": "n",
           "add_time": "2019-04-20 12:20:23",
           "content": "这是图片详情的内容，这里面可能含有标签，所以自己看着办吧？该何去何从，我也没办法这是图片详情的内容，这里面可能含有标签，所以自己看着办吧？该何去何从，我也没办法"
       }     
}
失败的返回结果：
{
    success: false,
    msg: '获取图片详细信息失败！'
}
```
####请求/home/photoinfo/:id页面图片缩略图
```
请求接口：'/api/getthumbnail/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "thumbnailList": [
           {
               "url": "../../api/images/photolist/1/01.jpg"
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取图片缩略图信息失败！'
}
```
####请求/home/goodslist页面数据
```
请求接口：'/api/getgoods'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "goodsList": [
           {
               "id": 241,
               "title": "Redmi K20",
               "url": "../../api/images/goods/01.jpg",
               "salePrice": 1799,
               "normalPrice": 1999,
               "inventory": 30
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取商品信息失败！'
}
```

####请求/home/goodsinfo/:id页面轮播图
```
请求接口：'/api/getgoodsphoto/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "photosList": [
           {
               "img": "../../api/images/goods/swipe/01.jpg"
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取商品轮播图失败！'
}
```
####请求/home/goodsinfo/:id页面商品详细信息
```
请求接口：'/api/getgoodsinfo/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "goodsInfo": [
           {
               "id": 241,
               "title": "Redmi K20",
               "add_time": "2019-05-25 08:20:31",
               "salePrice": 1799,
               "normalPrice": 1999,
               "inventory": 30,
               "goods_num": "SB14532988"
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取商品信息失败！'
}
```

####请求/home/goodsdesc/:id页面商品详细信息
```
请求接口：'/api/getgoodsdesc/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "goodsInfo": [
           {
               "title": "Redmi K20",
               "content": "<h2>快！骁龙855 处理器</h2><h2>游戏快 20%，运算快 45%，3 倍 AI 性能</h2><h2>高通骁龙 800 系史上最大升级</h2><p>盘点智能手机历代经典机型，哪一代没有骁龙 800 系的强大引擎！骁龙855 不仅在性能上全面飞跃，更有再次突破的 7nm - 领先芯片工艺加持。这一切已被我们首次应用于小米9，让你快人一步领略科技魅力。</p><img src='../../api/images/goods/info/storage.jpg' title='storage'/>"
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取商品描述信息失败！'
}
```
####请求/home/leavemessage页面所有留言信息
```
请求接口：'/api/getleavemessage'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "messageList":[
        {
            "id":1,
            "name":"钓王八的小鱼",
            "add_time":"2019-06-24 13:30:15",
            "content":"不听不听，王八念经！"
        }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取留言信息失败！'
}
```

####提交/home/leavemessage页面留言信息
```
请求接口：'/api/getleavemessage'
请求方式：'POST'
传入参数：{
    name: '会飞的鸭子'，
    content： '鸭子煮熟了'
}
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "messageList":[
        {
            "id":1,
            "name":"钓王八的小鱼",
            "add_time":"2019-06-24 13:30:15",
            "content":"不听不听，王八念经！"
        }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取留言信息失败！'
}
```

####获取/home/video页面留言视频列表
```
请求接口：'/api/getvideo'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "videoList": [
           {
               "id": 1,
               "title": "风 官方版 火箭少女101",
               "img": "../../images/video.png",
               "src": "http://hc.yinyuetai.com/uploads/videos/common/2A6D016B8888A91ED529735DDD36D272.mp4"
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取视频列表信息失败！'
}
```
####请求/shopcar页面所有商品信息
```
请求接口：'/api/getshopcarlist/:id'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "goodsList": [
       {
           "id": 241,
           "title": "Redmi K20",
           "url": "../../api/images/goods/01.jpg",
           "salePrice": 1799,
           "normalPrice": 1999,
           "inventory": 30
       }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取购物车商品信息失败！'
}
```

####请求/search页面所有商品信息
```
请求接口：'/api/getsearchgoods'
请求方式：'GET'
传入参数：无
返回数据格式： json
返回数据样式：
成功的返回结果：
{
    success: true,
   "goodsList": [
           {
               "id": 241,
               "title": "Redmi K20",
               "url": "../../api/images/goods/01.jpg",
               "salePrice": 1799,
               "normalPrice": 1999,
               "inventory": 30
           }
   ]           
}
失败的返回结果：
{
    success: false,
    msg: '获取搜索商品信息失败！'
}
```