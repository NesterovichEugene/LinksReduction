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
        $http.post('/login', $scope.signin).success(function(response){
            if(response === 'not found') {
                $('.modal-body').append('<p style="color: red; text-align: center; font-size: 13px">Not found user with this name</p>');
                $('.modal-body').find('p').fadeOut(3000);
            }
            else if(response === 'wrong pass'){
                $('.modal-body').append('<p style="color: red; text-align: center; font-size: 13px">Wrong password</p>');
                $('.modal-body').find('p').fadeOut(3000);
            }
            else{
                location.reload();
            }
        })
    };

    $scope.createUser = function(){
        $http.post('/signup', $scope.signup).success(function(response){
            if(response === 'dublicate'){
                $('.modal-body').append('<p style="color: red; text-align: center; font-size: 13px">User with this name already exists</p>');
                $('.modal-body').find('p').fadeOut(3000);
            }
            else{
                location.reload();
            }
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