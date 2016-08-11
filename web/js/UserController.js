var myApp = angular.module('myApp', []);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http){

    $scope.user = {};
    $scope.link={
        direct: "",
        description: "",
        tag: []
    };
    $scope.tags = [];
    $scope.edit = false;
    $scope.responseLink = null;
    $scope.template = "templates/reduce.html";

    $scope.changeTemplate = function(name){
        switch (name){
            case 'all':
                refreshAll();
                $scope.template = "templates/links.html";
                break;
            case 'reduce':
                $scope.template = "templates/reduce.html";
                break;
            case 'my':
                refreshMy();
                $scope.template = "templates/links.html";
                break;
        }
    };

        $http.get('/getUser').success(function (response) {
            $scope.user = response;
        });


    $scope.logout = function(){
        $http.get('/logout').success(function(response){
            location.reload();
        })
    };

    $scope.addTag = function () {
        if($scope.tags.length < 6) $scope.tags.push({});
    };

    $scope.removeTag = function(item){
        var index = $scope.tags.indexOf(item);
        $scope.link.tag.splice(index, 1);
        $scope.tags.splice(index, 1);
    };

    $scope.reduce = function(){
        if($scope.link.direct.indexOf('http') === -1){
            $scope.link.direct = 'http://'+$scope.link.direct
        }
        $http.post('/createLink', $scope.link).success(function(response){
            $scope.responseLink = response;
        });
    };

    $scope.followLink = function(){
        window.open($scope.responseLink.link);
    };

    var refreshAll = function() {
        $http.get('/linkslist').success(function (response) {
            $scope.linksList = response;
        });
    };

    var refreshMy = function() {
        $http.get('/mylinkslist').success(function (response) {
            $scope.linksList = response;
        });
    };

    $scope.info = function(link){
        $scope.template = "templates/view.html";
        $scope.link = link;
    };

    $scope.back = function(){
        $scope.template = "templates/links.html";
    };

}]);