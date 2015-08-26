angular.module("my_world")
    .controller("PeopleCtrl", function(NavSvc){
       NavSvc.setSelectedPath("/people");
    });