let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let Category = require('../models/category');
let Parent = require('../models/parent');
const e = require('express');

//商品数据接口
router.get('/data/product?', function(req, res){
  if(req.query.product_id){
    Product.findOne(req.query, function(err, data){
      if(err){
        return res.status(500).send('find error in api data/product')
      }
      res.json({data: data})
    })
  }else{
    Product.find({}, function(err, data){
      if(err){
        return res.status(500).send('find error in api data/product')
      }
      res.json({data: data})
    })
  }
})

//分类数据接口
router.get('/data/category', function(req, res){
  Category.find({}, function(err, data){
    if(err){
      return res.status(500).send('find error in api data/category')
    }
    res.json({data: data})
  })
})

router.get('/data/parent', function(req, res){
  Parent.find({}, function(err, data){
    if(err){
      return res.status(500).send('find error in api data/parent')
    }
    res.json({data: data})
  })
})

module.exports = router