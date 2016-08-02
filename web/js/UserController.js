var myApp = angular.module('myApp', []);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http){

    $scope.link={
        direct: "",
        description: "",
        tag: []
    };

    $scope.responseLink = null;

    $scope.logout = function(){
        $http.get('/logout').success(function(response){
            location.reload();
        })
    };

    $scope.tags = [];


    $scope.addTag = function () {
        $scope.tags.push({});
        console.log($scope.user);
    };

    $scope.removeTag = function(item){
        var index = $scope.tags.indexOf(item);
        $scope.link.tag.splice(index, 1);
        $scope.tags.splice(index, 1);
    };

    $scope.reduce = function(){
        $http.post('/createLink', $scope.link).success(function(response){
            $scope.responseLink = response;
            console.log($scope.responseLink.link);
        });
    }
}]);