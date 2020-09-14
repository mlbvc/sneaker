let express = require('express');
let router = express.Router();
let Admin = require('../models/admin');

/**
 * 进入主页
 */
router.get('/', function (req, res) {
	res.render('./layout.html',{
		admin: req.session.admin
	});
})

/**
 * 进入登录页
 */
router.get('/login', function (req, res) {
	res.render('./login.html');
})

/**
 * 登录
 */
router.post('/login', function (req, res) {
	Admin.findOne(req.body, function(err, data){
		if(err){
			return res.status(500).json({
				code: 500,
				message: 'login error'
			});
		}
		if(!data){
			return res.status(200).json({
				code: 1006,
				message: 'invaild adminname or password'
			});
		}else{
			req.session.admin = data;
			res.status(200).json({
				code: 1005,
				message: '登录成功'
			});
		}
	})
})

/**
 * 退出登录
 */
router.get('/logout', function(req, res){
	req.session.admin = null;
	res.redirect('/');
})

/**
 * 进入注册页面
 */
router.get('/register', function (req, res) {
	res.render('./register.html');
})

/**
 * 注册
 */
router.post('/register', function (req, res) {
	console.log("body",req.body, req.body.admin_name);
	Admin.findOne({
		admin_name: req.body.admin_name
	}, function(err, data){
		if(err){
			return res.status(500).json({
				code: 500,
				message: 'register error'
			});
		}
		if(data){
			return res.status(200).json({
				code: 1002,
				message: '用户名已被注册'
			});
		}
		new Admin(req.body).save(function(err, data){
			if(err){
				return res.status(500).json({
					code: 500,
					message: 'register error'
				});
			}
			req.session.admin = data
			res.status(200).json({
				code: 1001,
				message: '注册成功'
			});
		})
	})
})

module.exports = router