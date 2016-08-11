var myApp = angular.module('myApp', []);

myApp.controller('IndexController', ['$scope', '$http', function($scope, $http){

    $scope.template = "templates/links.html";

    $scope.login = function(){
        $http.post('/login', $scope.user).success(function(response){
            location.reload();
        })
    };

    $scope.createUser = function(){
        $http.post('/signup', $scope.user).success(function(response){
            location.reload();
        });
    };

    $scope.info = function(link){
        $scope.link = link;
    };

    $http.get('/linkslist').success(function (response) {
        $scope.linksList = response;
    });
}]);