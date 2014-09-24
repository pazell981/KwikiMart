myApp.factory('CustomerFactory', function ($filter, $http){
	
	var factory = {};
	
	
	factory.getCustomers = function (callback){
		$http.get("/api/customers").success(function (customers){
			callback (customers);
		});
	};
	
	factory.getDashCustomers = function (callback){
		$http.get("/api/dashCustomers").success(function (customers){
			callback (customers);
		});
	};

	factory.addNewCustomer = function (object, callback){
		var date = new Date();
		var datestr = $filter('date')(date, "MMMM d, yyyy");
		var pass = {name: object.name, created: datestr};
		$http.post('/api/customers', pass).success(function (data){
			if (data.status == "success"){
				callback(object);
			} else {
				alert("Your customer was not added, please try again.")
			}
		})
	};
	
	factory.validateCustomer = function (object, callback){
		$http.post("/api/validate", object).success(function (validation){
			callback(validation, object);
		})
	};
	
	factory.deleteCustomer = function (index, callback){
		$http.post("/api/delete", index).success(function (){
			callback();
		})
	};
	
	return factory;

});