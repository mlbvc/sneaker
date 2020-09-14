let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sneaker', { useMongoClient: true }, function (err) {
	if (err) {
		console.log('Connection Error:' + err);
	} else {
		console.log('Connection success!');
	}
});
let Schema = mongoose.Schema;
let parentSchema = new Schema({
  parent_id: {
    type: String,
    required: true
  },
  parent_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Parent', parentSchema)