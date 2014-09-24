myApp.controller('Customers', function($scope, $filter, CustomerFactory){
	
	$scope.predicate = '-created'
	$scope.predicate1 = 'name';
	$scope.predicate2 = 'name';
	$scope.date = new Date();

	CustomerFactory.getCustomers(function (customers){
		$scope.customers = customers;
	});
	CustomerFactory.getDashCustomers(function (customers){
		$scope.dashCustomers = customers;
	});

	$scope.addCustomer = function() {
		CustomerFactory.validateCustomer($scope.new_customer, function(validate, object){
			if(validate==="null"){
				CustomerFactory.addNewCustomer($scope.new_customer, function(){
						$scope.new_customer = "";
						CustomerFactory.getCustomers(function (data){
						$scope.customers = data;
					});
				});
			} else {
				$scope.new_customer = "";
				alert("Customer already exists.")
			}
		});
	};

	$scope.delCustomer = function (index){
		var index = {"_id": index}
		CustomerFactory.deleteCustomer(index, function (){
			CustomerFactory.getCustomers(function (data){
				$scope.customers = data;
			});
		});
	};

});