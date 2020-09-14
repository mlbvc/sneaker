let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sneaker', { useMongoClient: true }, function (err) {
	if (err) {
		console.log('Connection Error:' + err);
	} else {
		console.log('Connection success!');
	}
});
let Schema = mongoose.Schema;
let categorySchema = new Schema({
  category_id: {
    type: String,
    required: true
  },
  category_name: {
    type: String,
    required: true
  },
  parent: {
    type: String,
    required: true
  },
  parent_name: {
    type: String,
  }
});

module.exports = mongoose.model('Category', categorySchema)
