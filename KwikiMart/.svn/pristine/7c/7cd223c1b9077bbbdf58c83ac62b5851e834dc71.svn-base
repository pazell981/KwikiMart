var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name:  String,
  created: { type: Date },
  hidden: Boolean
});

CustomerSchema.path('name').required(true, 'Name cannot be blank');

mongoose.model('Customer', CustomerSchema);