myApp.factory('OrderFactory', function ($filter, $http){
	
	var factory = {};

	factory.getDashOrders = function (callback){
		$http.get("/api/dashOrders").success(function (orders){
			callback(orders);
		});
	}
	
	factory.getOrders = function (callback){
		$http.get("/api/orders").success(function (orders){
			callback(orders);
		});
	}
	
	factory.addNewOrder = function(object, callback){
		var date = new Date();
		var datestr = $filter('date')(date, "MMMM d, yyyy");
		var pass = {customer: object.customer, product: object.product, quantity: object.quantity, created: datestr};
		$http.post('/api/orders', pass).success(function (data){
			if (data.status == "success"){
				callback(object);
			} else {
				alert("Your order was not added, please try again.")
			}
		})
	}
	
	return factory;

});