myApp.controller('Orders', function($scope, $filter, OrderFactory, CustomerFactory, ProductFactory){
	
	$scope.predicate = '-created';
	$scope.predicate1 = 'name';
	$scope.predicate2 = 'name';

	CustomerFactory.getCustomers(function (customers){
		$scope.customers = customers;
	});
	OrderFactory.getDashOrders(function (orders){
		$scope.dashOrders = orders;
	});
	OrderFactory.getOrders(function (orders){
		$scope.orders = orders;
	});
	ProductFactory.getProducts(function (products){
		$scope.products = products;
	});

	$scope.addOrder = function() {
		$scope.product = {"name": $scope.new_order.product};
		ProductFactory.validateProduct( $scope.product, function (validate, object){
			var invUpdate = validate
			invUpdate.quantity = validate.quantity-$scope.new_order.quantity;
			ProductFactory.updateInventory(invUpdate, function(update, object){
				OrderFactory.addNewOrder($scope.new_order,function(){
						$scope.new_order = "";
						OrderFactory.getOrders(function (data){
						$scope.orders = data;
					});
				});
				$scope.new_order = "";
			})
		})
	}

});