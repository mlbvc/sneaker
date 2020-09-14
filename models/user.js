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
let userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('User', userSchema)