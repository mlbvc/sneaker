let express = require('express')
let Parent = require('../models/parent')
let router = express.Router()

/**
 * 进入父类页
 */
router.get('/parent', function(req, res){
  Parent.find(function(err, data){
    if(err){
      return res.status(500).send('parent find error')
    }
    res.render('./parent.html', {
      parent: data
    })
  })
})


/**
 * 进入父类添加页
 */
router.get('/parent/add', function(req, res){
    res.render('./parent_add.html')
})

/**
 * 添加父类
 */
router.post('/parent/add', function(req, res){
  new Parent(req.body).save(function(err){
    if(err){
      return res.status(500).send('catergory add error')
    }
    res.status(200).json({
      code: 1300,
      message: '父类添加成功'
    })
  })
})

/**
 * 进入父类编辑页
 */
router.get('/parent/edit', function(req, res){
  console.log(req.query)
  Parent.findById(req.query.id, function(err, data){
    if(err){
      res.status(500).send('enter cate edit error')
    }
    res.render('./parent_edit.html', {
      parent: data
    })
  })
})

/**
 * 父类编辑保存
 */
router.post('/parent/edit', function(req, res){
  Parent.findByIdAndUpdate(req.body.id, req.body, function(err, data){
    if(err){
      res.status(500).send('cate edit save error')
    }
    res.redirect('/parent')
  })
})

router.get('/parent/delete', function(req, res){
  Parent.findByIdAndRemove(req.query.id, function(err){
    if(err){
      res.status(500).send('cate delete error')
    }
    res.redirect('/parent')
  })
})
module.exports = router