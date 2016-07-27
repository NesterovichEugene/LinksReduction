var myApp = angular.module('myApp', []);

myApp.controller('ApplicationController', ['$scope', '$http', function($scope, $http){

    $scope.login = function(){
        $http.post('/login', $scope.user).success(function(response){
            console.log(response);
            $('.close-modal').trigger('click');
        })
    };

    $scope.createUser = function(){
        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            $('.close-modal').trigger('click');
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