let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sneaker', { useMongoClient: true }, function (err) {
	if (err) {
		console.log('Connection Error:' + err);
	} else {
		console.log('Connection success!');
	}
});
let Schema = mongoose.Schema;
let productSchema = new Schema({
  product_id: {
    type: String,
    required: true
  },
  product_name: {
    type:String,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  is_on_the_shelf: {
    type: Number,
    enum: [0, 1],
  },
  // size: {
  //   type: Array,
  // },
  description: {
    type: String
  },
  introduction: {
    type: String
  },
  imgUrl: {
    type: String
  }
})
module.exports = mongoose.model('Product', productSchema)