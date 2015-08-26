angular.module("my_world")
    .controller("ThingsEditCtrl", function($scope, $http, $location, $routeParams, ThingsSvc, NavSvc){
        
        NavSvc.setSelectedPath("/things");
        $scope.thing = {
        };
        ThingsSvc.getThing($routeParams.id)
            .then(function(thing){
                $scope.thing = thing;
            });
        $scope.save = function(){
            ThingsSvc.save($scope.thing)
                .then( function(thing){
                    $location.path("/things");
                })
                .catch(function(error){
                    $scope.error = error; 
                });
        }
    });