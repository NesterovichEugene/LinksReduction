var myApp = angular.module('myApp', []);

myApp.controller('IndexController', ['$scope', '$http', function($scope, $http){

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


    $scope.linksList = [
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'},
        {link: 'lol.com', direct: 'google.com'},
        {link: 'lol.com/qw', direct: 'fb.com'}
    ];

}]);