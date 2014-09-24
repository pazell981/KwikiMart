var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name:  String,
  image_file:  String,
  description: String,
  quantity: Number,
  hidden: Boolean
});

ProductSchema.path('name').required(true, 'Name cannot be blank');

mongoose.model('Product', ProductSchema);