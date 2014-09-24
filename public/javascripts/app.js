var myApp = angular.module('myApp', ['ngRoute','angularMoment']);

myApp.constant('angularMomentConfig', {});

//file upload directive: used to tell html parse how to use the file input field and give access to the controller
myApp.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

//file upload service: created service so could be accessed in multiple controller or could have been written directly in controller
myApp.service('fileUpload', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        //encapsulates the file in form data to pass it to the route
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            //lets the browser decide that it's multipart form, if defined as multipart process throws error
            headers: {
                'Content-Type': undefined
            }
        })
            .success(function() {})
            .error(function() {});
    }
});

myApp.filter('partition', function() {
    var cache = {};
    var filter = function (arr, size){
        if (!arr) {
            return;
        }
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        var arrString = JSON.stringify(arr);
        var fromCache = cache[arrString + size];
        if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
            return fromCache;
        }
        cache[arrString + size] = newArr;
        return newArr;
    };
    return filter;
});

myApp.filter('startFrom', function (){
    var filter = function (input, start){
        console.log(input);
        start += start;
        return input.slice(start);
    };
    return filter
});