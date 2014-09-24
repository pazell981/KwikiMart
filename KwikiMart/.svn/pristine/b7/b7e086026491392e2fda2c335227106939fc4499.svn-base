var mongoose = require("mongoose");
var Customer = mongoose.model("Customer");
var Product = mongoose.model("Product");
var Order = mongoose.model("Order");

module.exports = function Routes(app){

	app.get("/", function (req,res){ 
		res.render("index");
	});

	app.get('/api/customers', function (req, res){
		Customer.find({}, function (err, customers){
			res.json(customers);
		})
	})

	app.get('/api/products', function (req, res){
		Product.find({}, function (err, products){
			res.json(products);
		})
	})

	app.get('/api/orders', function (req, res){
		Order.find({}, function (err, orders){
			res.json(orders);
		})
	})

	app.post('/api/customers', function (req, res){
		var new_customer = new Customer (req.body);
		new_customer.save(function (errors){
			if (errors){
				res.json({status: "error", errors: errors})
			} else {
				res.json({status: "success"})
			}
		})
	})

	app.post('/api/validate', function (req, res){
		var new_customer = req.body.name
		Customer.findOne({"name": new_customer}, function (err, validate){
			res.json(validate);
		})
	})

	app.post('/api/delete', function (req, res){
		Customer.remove(req.body, function (err, data){
			res.json({status:"delete"});
		})
	})

	app.post('/api/orders', function (req, res){
		var new_order = new Order (req.body);
		new_order.save(function (errors){
			if (errors){
				res.json({status: "error", errors: errors})
			} else {
				res.json({status: "success"})
			}
		})
	})
};
