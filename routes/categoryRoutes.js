let express = require('express')
let Category = require('../models/category')
let router = express.Router()

/**
 * 进入分类页
 */
router.get('/category', function(req, res){
  Category.find(function(err, data){
    if(err){
      return res.status(500).send('category find error')
    }
    res.render('./category.html', {
      category: data
    })
  })
})


/**
 * 进入分类添加页
 */
router.get('/category/add', function(req, res){
    res.render('./category_add.html')
})

/**
 * 添加分类
 */
router.post('/category/add', function(req, res){
  new Category(req.body).save(function(err){
    if(err){
      return res.status(500).send('catergory add error')
    }
    res.status(200).json({
      code: 1200,
      message: '分类添加成功'
    })
  })
})

/**
 * 进入分类编辑页
 */
router.get('/category/edit', function(req, res){
  console.log(req.query)
  Category.findById(req.query.id, function(err, data){
    if(err){
      res.status(500).send('enter cate edit error')
    }
    res.render('./category_edit.html', {
      category: data
    })
  })
})

/**
 * 分类编辑保存
 */
router.post('/category/edit', function(req, res){
  Category.findByIdAndUpdate(req.body.id, req.body, function(err, data){
    if(err){
      res.status(500).send('cate edit save error')
    }
    res.redirect('/category')
  })
})

router.get('/category/delete', function(req, res){
  Category.findByIdAndRemove(req.query.id, function(err){
    if(err){
      res.status(500).send('cate delete error')
    }
    res.redirect('/category')
  })
})
module.exports = router