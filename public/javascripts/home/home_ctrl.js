angular.module("my_world")
    .controller('HomeCtrl', function($scope, NavSvc, AuthSvc){
       NavSvc.setSelectedPath("/");
       $scope.message = "Welcome to My World";
       if(AuthSvc.user.authenticated())
        $scope.message += ("Your lucky number is " + AuthSvc.user.luckyNumber);
       
       $scope.user = AuthSvc.user;
    });