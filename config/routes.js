var mongoose = require("mongoose");
var fs = require('fs');
var Customer = mongoose.model("Customer");
var Product = mongoose.model("Product");
var Order = mongoose.model("Order");

module.exports = function Routes(app){

	app.get("/", function (req,res){ 
		res.render("index");
	});

	app.get('/api/dashCustomers', function (req, res){
		Customer.find({}).limit(5).sort('-_id').exec(function (err, customers){
			res.json(customers);
		});
	});

	app.get('/api/dashOrders', function (req, res){
		Order.find({}).limit(5).sort('-_id').exec(function (err, orders){
			res.json(orders);
		});
	});

	app.get('/api/dashProducts', function (req, res){
		Product.find({}).limit(4).sort('-_id').exec(function (err, products){
			res.json(products);
		});
	});

	app.get('/api/customers', function (req, res){
		Customer.find({}, function (err, customers){
			res.json(customers);
		});
	});

	app.get('/api/orders', function (req, res){
		Order.find({}, function (err, orders){
			res.json(orders);
		});
	});

	app.get('/api/products', function (req, res){
		Product.find({}, function (err, products){
			res.json(products);
		});
	});

	app.post('/api/customers', function (req, res){
		var new_customer = new Customer (req.body);
		new_customer.save(function (errors){
			if (errors){
				res.json({status: "error", errors: errors})
			} else {
				res.json({status: "success"})
			}
		});
	});

	app.post('/api/delete', function (req, res){
		Customer.remove(req.body, function (err, data){
			res.json({status:"delete"});
		});
	});

	app.post('/api/orders', function (req, res){
		var new_order = new Order (req.body);
		new_order.save(function (errors){
			if (errors){
				res.json({status: "error", errors: errors})
			} else {
				res.json({status: "success"})
			}
		});
	});

	app.post('/api/products', function (req, res){
		var new_product = new Product (req.body);
		new_product.save(function (errors){
			if (errors){
				res.json({status: "error", errors: errors})
			} else {
				res.json({status: "success"})
			}
		});
	});

	app.post('/api/update_inv', function (req, res){
		var product_id = {"_id": req.body._id};
		var product_inv = {"quantity": req.body.quantity};
		var option = {"multi": false}
		Product.update(product_id, product_inv, option, function (err, update){
			res.json(update);
		});
	});

	app.post('/api/valid_prod', function (req, res){
		var new_product = req.body.name
		Product.findOne({"name": new_product}, function (err, validate){
			res.json(validate);
		});
	});

	app.post('/api/validate', function (req, res){
		var new_customer = req.body.name
		Customer.findOne({"name": new_customer}, function (err, validate){
			res.json(validate);
		});
	});

	app.post('/upload_file', function (req, res){
		var file = req.files.file;  //file location within req
		//first the temp file must be read
		fs.readFile(file.path, function(err, data){
			//where the upload will be saved along with what it will be named
			var path = __dirname + "/../public/images/" +file.originalname;
			//writes the temp file to upload location/name
			fs.writeFile(path, data, function(err){
				//deletes temp file
				fs.unlinkSync(file.path);
				if(err) {
		      console.log(err);
		    } else {
		      console.log("The file was saved!");
		    }
		  });
		});
	});
	
};
