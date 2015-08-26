angular.module("my_world")
    .directive("mainNav", function(){
        console.log("hello");
        return {
            restrict: 'E',
            templateUrl: '/templates/main_nav.html',
            controller: function($scope, NavSvc, AuthSvc){
                $scope.tabs = NavSvc.tabs;
                $scope.user = AuthSvc.user
            },
            scope: {
                mode: '@'
            }
        };
    });