var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name:  String,
  hidden: Boolean
});

ProductSchema.path('name').required(true, 'Name cannot be blank');

mongoose.model('Product', ProductSchema);