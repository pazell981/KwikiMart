myApp.factory('ProductFactory', function ($http){
	
	var factory = {};

	factory.getDashProducts = function(callback){
		$http.get("/api/dashProducts").success(function (products){
			callback (products);
		});
	};

	factory.getProducts = function(callback){
		$http.get("/api/products").success(function (products){
			callback (products);
		});
	};

	factory.addNewProduct = function (object, callback){
		$http.post('/api/products', object).success(function (data){
			if (data.status == "success"){
				callback(object);
			} else {
				alert("Your product was not added, please try again.")
			}
		})
	};

	factory.updateInventory = function (object, callback){
		$http.post("/api/update_inv", object).success(function (update){
			callback(update, object);
		})
	}

	factory.validateProduct = function (object, callback){
		$http.post("/api/valid_prod", object).success(function (validation){
			callback(validation, object);
		})
	};

	return factory;

});