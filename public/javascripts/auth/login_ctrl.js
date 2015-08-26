angular.module("my_world")
    .controller("LoginCtrl", function($scope, $location, NavSvc, AuthSvc){
        console.log(AuthSvc.user.authenticated())
        if(AuthSvc.user.authenticated()){
            AuthSvc.logout();
            return;
        }
        NavSvc.setSelectedPath("/login");
        
        $scope.user = {};
        
        $scope.login = function(){
            AuthSvc.authenticate($scope.user)
                .then(
                    function(result){
                        console.log("SUCCESS");
                        console.log(result);
                    },
                    function(result){
                        $scope.error = result;
                        console.log(result);
                    }
                );
        }
        
        
    });