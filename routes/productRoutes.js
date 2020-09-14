let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let fs = require('fs');
let Product = require('../models/product')

/**
 * 进入商品页
 */
router.get('/product', function (req, res) {
  let maxPage = [],
      count = 5, //一页渲染几个数据
      pageNum = req.query.pageNum ? Number(req.query.pageNum) : 1,
      number = null;
  Product.find(function (err, data) {
    if (err) {
      return res.status(500).send('product find error');
    }
    number = Math.ceil(data.length / count);
    maxPage = new Array(number).fill(1);
    Product.find().limit(5).skip((pageNum - 1) * count).find(function (err, newData) {
      if (err) {
        return res.status(500).send('product find error');
      }
      res.render('./product.html', {
        product: newData,
        admin: req.session.admin,
        pageNum: pageNum,
        maxPage: maxPage
      })
    })
  })
})

/**
 * 进入商品添加页
 */
router.get('/product/add', function (req, res) {
  res.render('./product_add.html');
})

/**
 * 添加商品
 */
router.post('/product/add', function (req, res) {
  // 提交
  // new Product(req.body).save(function (err) {
  //   if (err) {
  //     // if(!data && !data.id){
  //     //   return res.status(500).send('请输入id')
  //     // }else if(!data && !data.product_name){
  //     //   return res.status(500).send('请输入商品名')
  //     // }
  //     return res.status(500).send('product add error');
  //   }
  //   res.redirect('/product');
  //   // res.status(200).json({
  //   //   code: 1100,
  //   //   message: '商品添加成功'
  //   // });
  // })
  let form = new formidable.IncomingForm();
  form.uploadDir = './public/img';
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
    }
    let oldPath = files.picture.path,
      newPath = 'public/img/' + fields.product_name + '.jpg',
      picture = files.picture.name !== '' ? '/' + newPath : '/public/img/avatar.svg';
      console.log(files)
    if (files.picture.name !== '') {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          throw err;
        }
        console.log('重命名完成');
      });
    }
    new Product({...fields, picture}).save(function (err) {
      if (err) {
        return res.status(500).send('product add error');
      } else {
        res.status(200).json({
          code: 1100,
          message: '商品添加成功'
        });
        // res.redirect('/product');
      }
    })
  });
})

/**
 * 进入商品编辑页
 */
router.get('/product/edit', function (req, res) {
  Product.findById(req.query.id, function (err, data) {
    if (err) {
      return res.status(500).send('enter product edit error');
    }
    res.render('./product_edit.html', {
      product: data,
      admin: req.session.admin
    })
  })
})

/**
 * 商品编辑保存
 */
router.post('/product/edit', function (req, res) {
  console.log(req.body.id, req.body)
  Product.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return res.status(500).send('product edit save error');
    } else {
      res.status(200).json({
        code: 1101,
        message: '商品编辑成功'
      });
      // res.redirect('/product');
    }
    
  })
  // let form = new formidable.IncomingForm();
  // form.uploadDir = './public/img';
  // form.keepExtensions = true;     //保留后缀
  // form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  // form.multiples = false;
  // form.parse(req, function (err, fields, files) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   let oldPath = files.picture.path,
  //       newPath = 'public/img/' + fields.product_name + '.jpg',
  //       picture = files.picture.name !== '' ? '/' + newPath : '/public/img/avatar.svg';
  //   if (files.picture.name !== '') {
  //     fs.rename(oldPath, newPath, (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log('重命名完成');
  //     });
  //   }
  //   Product.findByIdAndUpdate(fields.id, {...fields, picture}, function (err) {
  //     if (err) {
  //       return res.status(500).send('product edit save error');
  //     }
  //     res.redirect('/product');
  //   })
  // });
})

/**
 * 删除商品
 */
router.get('/product/delete', function (req, res) {
  Product.findByIdAndRemove(req.query.id, req.body, function (err) {
    if (err) {
      return res.status(500).send('product delete error');
    }
    // 判断文件是否存在，存在则删除上传的文件
    if(fs.existsSync('.' + req.query.picture && req.query.picture !== '/public/img/avatar.svg')){
      fs.unlink(req.query.picture, function (err) {
        if (err) {
          throw err;
        }
      })
    }
    res.redirect('/product');
  })
})
module.exports = router