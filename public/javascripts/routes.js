myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        redirectTo: '/dashboard'
      })
    .when('/dashboard',
      {
        templateUrl: '/javascripts/partials/dashboard.html'
      })
    .when('/products',
      {
        templateUrl: '/javascripts/partials/products.html',
        controller: 'Products'
      })
    .when('/orders',
      {
        templateUrl: '/javascripts/partials/orders.html',
        controller: 'Orders'
      })
    .when('/customers',
      {
        templateUrl: '/javascripts/partials/customers.html',
        controller: 'Customers'
      })
    .otherwise({
      redirectTo: '/'
      });
});