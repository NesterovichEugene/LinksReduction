var myApp = angular.module('myApp', []);

myApp.controller('IndexController', ['$scope', '$http', function($scope, $http){

    $scope.template = "templates/index.html";

    $scope.changeTemplate = function(name){
        switch (name){
            case 'links':
                $scope.refreshAll();
                $scope.template = "templates/links.html";
                break;
            case 'home':
                $scope.template = "templates/index.html";
                break;
        }
    };

    $scope.refreshAll = function() {
        $http.get('/linkslist').success(function (response) {
            $scope.linksList = response;
        });
    };

    $scope.followLink = function(link){
        window.open(link.link);
    };

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
        $http.post('/getTags', $scope.link).success(function (response) {
            $scope.tagsList = response;
        });
    };

    $scope.viewTag = function(tagName){
        $('#linksModal').modal('hide');
        $scope.template = "templates/links.html";
        $http.post('/viewTag', {name: tagName}).success(function (response) {
            $scope.linksList = response;
        });
    };

    $http.get('/linkslist').success(function (response) {
        $scope.linksList = response;
    });
}]);