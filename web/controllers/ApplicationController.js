var myApp = angular.module('myApp', []);

myApp.controller('ApplicationController', ['$scope', '$http', function($scope, $http){

    $scope.login = function(){
        $http.get('/login', $scope.user).success(function(response){
            console.log(response);
        })
    };

    $scope.createUser = function(){
        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            $('.close-modal').trigger('click');
        });
    }
}]);