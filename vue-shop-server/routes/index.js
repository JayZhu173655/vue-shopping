var express = require('express');
var router = express.Router();
var fs = require('fs');
var moment = require('moment');



// 下面是vue-shop的router的接口路由
// 菜单数据
router.get('/api/nav',function(req,res){
    fs.readFile('api/nav.json', 'utf-8',function(err, data){
        if(err){
            res.send({code: 0, msg: '获取信息失败'})
        } else{
            res.send(JSON.parse(data))
        }
       
    });
   
})

// 轮播数据
router.get('/api/swipe',function(req,res){
    fs.readFile('api/swipe.json', 'utf-8',function(err, data){
        if(err){
            res.send({success: false, msg: '获取信息失败'})
        } else{
            res.send(JSON.parse(data))
        }
       
    });
   
})

// 新闻列表数据
router.get('/api/newslist',function(req,res){
    fs.readFile('api/newslist.json', 'utf-8',function(err, data){
        if(err){
            res.send({success: false, msg: '获取信息失败'})
        } else{
            res.send(JSON.parse(data))
        }
       
    });
   
})
// 在获取路由中的id时，如果当字符串使用不用处理，如果要当数字使用需要把字符串变成数字格式
// 新闻详情数据
router.get('/api/newsdetails/:id',function(req,res){
    let id = req.params.id;
    fs.readFile('api/newsdetails/' + id + '.json', 'utf-8',function(err, data){
        if(err){
            res.send({success: false, msg: '获取信息失败'})
        } else{
            res.send(JSON.parse(data))
        }
       
    });
   
})


// 获取文章对应的页数的所有评论
router.get('/api/getcomments/:id',function(req,res){
    let id = req.params.id;
    let pageindex = parseInt(req.query.pageindex);
    fs.readFile('api/getcomments/' + id + '.json', 'utf-8',function(err, data){
        if(err){
            res.send({success: false, msg: '获取信息失败'})
        } else{
            let commentsList = JSON.parse(data).commentsList;
            let len = commentsList.length;
            let max = null;
            let arr = [];
            if(len - pageindex * 3 >= -2){
                if(len - pageindex * 3 <= 0){
                    max = len
                } else{
                    max = pageindex * 3
                }
            }
            commentsList.forEach(function(item,index){
                if(((pageindex - 1) * 3 <= index) && (index < max)){
                    arr.push(item)  
                }
            })
            res.send({success: true, commentsList: arr})
        }
       
    });
})
// 提交评论数据
router.post('/api/submitcomment/:id',function(req,res){
    let id = parseInt(req.params.id);
    fs.readFile('api/getcomments/' + id + '.json', 'utf-8',function(err, data){
        if(err){
            res.send({success: false, msg: '获取信息失败'})
        } else{
            let markTime = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
            let index = JSON.parse(data).commentsList.length + 1;
            let dataContent = JSON.parse(data);
            let item = {
                            id: index + "",
                            user_name: "匿名用户",
                            add_time: markTime,
                            content: req.body.content
                        };
            dataContent.commentsList.push(item);//dataContent
            fs.writeFile('api/getcomments/' + id + '.json', JSON.stringify(dataContent), 'utf-8', function(err){
                if(err){
                    res.send({success: false, msg: '评论失败'})
                } else{
                    res.send({success: true, msg: '评论成功'})
                }
            })

        }
       
    });
   
})

// 请求category数据
router.get('/api/getcategory',function(req, res){
    fs.readFile('api/category.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: 'category数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})

// 请求图片数据
router.get('/api/getphotos/:id',function(req, res){
    let id = req.params.id;
    fs.readFile('api/photolist/' + id + '.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: 'category数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})
// 请求图片详情
router.get('/api/getphotoinfo/:id',function(req,res){
    let id = req.params.id;
    fs.readFile('api/photoinfos/' + 21 + '.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '图片详情数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})
// 请求图片缩略图
router.get('/api/getthumbnail/:id',function(req,res){
    let id = req.params.id;
    fs.readFile('api/thumbnails/' + 21 + '.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '图片详情数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})
// 请求商品列表
router.get('/api/getgoods', function(req,res){
    let pageIndex = parseInt(req.query.pageindex);
    fs.readFile('api/goods/1.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '商品数据请求失败'})
        } else{
            let len = JSON.parse(data).goodsList.length;
            let max = null;
            let arr = [];
            if(len - pageIndex * 6 <= 0 && len - pageIndex * 6 >= -5){
                max = len
            } else if(len - pageIndex * 6 > 0){
                max = pageIndex * 6
            }
            JSON.parse(data).goodsList.map((item, index) => {
                if( (pageIndex - 1) * 6 <= index && index < pageIndex * 6){
                    arr.push(item)
                }
            })
            res.send({success: true, goodsList: arr})

        }
    })
})
// 获取商品轮播图片
router.get('/api/getgoodsphoto/:id', function(req,res){
    let id = parseInt(req.params.id);
    fs.readFile('api/goods/2.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '商品数据请求失败'})
        } else{
            res.send(JSON.parse(data))

        }
    })
})
// 获取商品页面所有信息
router.get('/api/getgoodsinfo/:id', function(req,res){
    let id = parseInt(req.params.id);
    fs.readFile('api/goods/' + id + '.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '商品页面详情数据请求失败'})
        } else{
            res.send(JSON.parse(data))

        }
    })
})
// 获取商品描述信息
router.get('/api/getgoodsdesc/:id', function(req,res){
    let id = parseInt(req.params.id);
    fs.readFile('api/goods/info/' + id + '.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '商品页面详情数据请求失败'})
        } else{
            res.send(JSON.parse(data))

        }
    })
})
// 获取加入购物车的所有商品描述信息
router.get('/api/getshopcarlist/:id', function(req,res){
    let arrID = req.params.id.split(',');
    console.log(arrID)
    fs.readFile('api/goods/1.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '购物车商品信息数据请求失败'})
        } else{
            let shopCarList = [];
            arrID.forEach(arrItem => {
                JSON.parse(data).goodsList.some(item => {
                    if(item.id === parseInt(arrItem)){
                        let goodInfo = {};
                        goodInfo.id = item.id;
                        goodInfo.title = item.title;
                        goodInfo.img = item.url;
                        goodInfo.salePrice = item.salePrice;
                        shopCarList.push(goodInfo)
                    }
                })
            })
            res.send({success: true, shopCarList})
        }
    })
})
// 获取搜索商品列表
router.get('/api/getsearchgoods', function(req, res){
    let keyWords = req.query.keywords;
    fs.readFile('api/goods/1.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '查询商品数据请求失败'})
        } else{
            let arr = [];
            JSON.parse(data).goodsList.map(item => {
                if(item.title.indexOf(keyWords) !== -1){
                    arr.push(item)
                }
            })
            res.send({success: true, searchGoodsList: arr})
        }
    })
})
// 获取用户留言列表
router.get('/api/getleavemessage', function(req, res){
    fs.readFile('api/message.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '留言信息数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})
// 提交用户留言
router.post('/api/addleavemessage', function(req, res){
        console.log(req.body)
        fs.readFile('api/message.json', 'utf-8', function(err, data){
            if(err){
                res.send({success: false, msg: '评论失败！'})
            } else{
                let messageList = JSON.parse(data).messageList
                let len = messageList.length;
                let item = {};
                item.id = len + 1;
                item.name = req.body.name;
                item.content = req.body.content;
                item.add_time = new Date()
                messageList.push(item)
                fs.writeFile('api/message.json',JSON.stringify({success: true,messageList}), 'utf-8', function(err){
                    if(err){
                        res.send({success: false, msg: '评论失败！'})
                    } else{
                        res.send({success: true,messageList})
                    }
                })
            }
        })
})
// 获取视频列表
router.get('/api/getvideo', function(req, res){
    fs.readFile('api/video.json', 'utf-8', function(err, data){
        if(err){
            res.send({success: false, msg: '视频列表数据请求失败'})
        } else{
            res.send(JSON.parse(data))
        }
    })
})

module.exports = router;
