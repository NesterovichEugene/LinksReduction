var myApp = angular.module('myApp', []);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http){

    $scope.user = {};
    $scope.link={
        direct: "",
        description: "",
        tag: []
    };
    $scope.tags = new Array(3);
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

    $scope.reduce = function(){
        if($scope.link.direct.indexOf('http') === -1){
            $scope.link.direct = 'http://'+$scope.link.direct
        }
        $http.post('/createLink', $scope.link).success(function(response){
            $scope.responseLink = response;
        });
        $http.post('/createTag', $scope.link);
    };

    $scope.followLink = function(link){
        window.open(link.link);
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
        $scope.link = link;
        $http.post('/getTags', $scope.link).success(function (response) {
            $scope.tagsList = response;
        });
    };

    $scope.viewTag = function(tagName){
        if(!$scope.edit){
            $('#linksModal').modal('hide');
            $http.post('/viewTag', {name: tagName}).success(function (response) {
                $scope.linksList = response;
            });
        }
    };

    $scope.closeInfo = function(){
        if($scope.edit){
            $scope.edit = false;
        }
    };

    $scope.editLink = function(){
        if(!$scope.edit){
            $scope.edit = true;
        }
    };

    $scope.saveLink = function(link, tags){
        $http.post('/updateLink', link);
        $http.post('/updateTags', tags);
        $scope.edit = false;
    }

}]);