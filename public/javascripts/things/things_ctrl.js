angular.module("my_world")
    .controller("ThingsCtrl", function($scope, ThingsSvc, NavSvc, AuthSvc){
        NavSvc.setSelectedPath("/things");
        $scope.canDelete = function(){
            return AuthSvc.user.authenticated();
        };
        
        function activate(){
            ThingsSvc.getThings()
            .then( function(things){
                $scope.things = things;
            });
        }
        $scope.delete = function(thing){
            ThingsSvc.deleteThing(thing)
                .then(function(){
                    activate();
                });
        };
        activate();
    });