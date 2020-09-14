let express = require('express');
let router = express.Router();
let User = require('../models/user');


/**
 * 登录
 */
router.post('/user/login', function (req, res) {
	console.log(req.body)
	User.findOne(req.body, function(err, data){
		if(err){
			return res.status(500).json({
				code: 500,
				message: 'user login error'
			});
		}
		if(!data){
			return res.status(200).json({
				code: 2006,
				message: 'invaild username or password'
			});
		}else{
			// req.session.user = data;
			res.status(200).json({
				code: 2005,
				message: '登录成功',
				user: data
			});
		}
	})
})

/**
 * 注册
 */
router.post('/user/register', function (req, res) {
	console.log("body",req.body, req.body.username);
	User.findOne({
		username: req.body.username
	}, function(err, data){
		if(err){
			return res.status(500).json({
				code: 500,
				message: 'register error'
			});
		}
		if(data){
			return res.status(200).json({
				code: 2002,
				message: '用户名已被注册'
			});
		}
		new User(req.body).save(function(err, data){
			if(err){
				return res.status(500).json({
					code: 500,
					message: 'register error'
				});
			}
			// req.session.user = data
			res.status(200).json({
				code: 2001,
				message: '注册成功'
			});
		})
	})
})

module.exports = router