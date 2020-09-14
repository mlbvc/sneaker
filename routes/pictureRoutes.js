let express = require('express')
let Product = require('../models/product')
let router = express.Router()

router.get('/picture?', function(req, res){
  Product.findOne(req.query.id, function(err, data){
    if(err){
      return res.status(500).send('parent find error')
    }
    res.json({
      picture: data.picture
    })
  })
})

module.exports = router