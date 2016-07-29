var myApp = angular.module('myApp', []);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http){

    $scope.logout = function(){
        $http.get('/logout', $scope.user).success(function(response){
            location.reload();
        })
    }

}]);