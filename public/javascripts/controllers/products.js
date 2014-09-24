myApp.controller('Products', function($scope, fileUpload, $filter, $http, ProductFactory) {

    $scope.currentPage = 0;
    $scope.Math = window.Math;
    $scope.pageSize = 8;
    $scope.predicate = 'name';

    ProductFactory.getDashProducts(function(products) {
        $scope.dashProducts = products;
    });
    ProductFactory.getProducts(function(products) {
        $scope.products = products;
    });

    $scope.addProduct = function() {
        ProductFactory.validateProduct($scope.new_product, function (validate, object) {
            if (validate === "null") {
                var file = $scope.imgFile;
                //defines what route to pass file to 
                var uploadUrl = "/upload_file";
                fileUpload.uploadFileToUrl(file, uploadUrl);
                //below is the processing to add database entry                
                var filelocation = '/images/' + file.name;
                var date = new Date();
                var datestr = $filter('date')(date, "MMMM d, yyyy");
                $scope.pass = {
                    name: $scope.new_product.name,
                    image_file: filelocation,
                    description: $scope.new_product.desc,
                    quantity: $scope.new_product.quantity,
                    created: datestr
                };
                ProductFactory.addNewProduct($scope.pass, function() {
                    $scope.new_product=null;
                    ProductFactory.getProducts(function(data) {
                        $scope.products = data;
                    });
                });
            } else {
               $scope.new_product=null;
                alert("Product already exists.")
            };
        });
    };

});