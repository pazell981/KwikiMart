var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  customer:  String,
  product: String,
  quantity: Number,
  created: { type: Date, default: Date.now  },
  hidden: Boolean
});

OrderSchema.path('customer').required(true, 'Customer cannot be blank');
OrderSchema.path('product').required(true, 'Product cannot be blank');
OrderSchema.path('quantity').required(true, 'Quantity cannot be blank');

mongoose.model('Order', OrderSchema);