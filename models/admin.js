let mongoose = require('mongoose');
//原来{ useNewUrlParser: true }
mongoose.connect('mongodb://localhost/sneaker', { useMongoClient: true }, function (err) {
	if (err) {
		console.log('Connection Error:' + err);
	} else {
		console.log('Connection success!');
	}
});
let Schema = mongoose.Schema;
let adminSchema = new Schema({
	admin_name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: Number,
		enum: [0, 1],
		default: 0
	},
	email: {
		type: String,
	},
	created_time: {
		type: Date,
		default: Date.now
	},
	last_login_time: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar.svg'
	},
	personal_signature: {
		type: String,
		default: ''
	}
})

module.exports = mongoose.model('Admin', adminSchema)