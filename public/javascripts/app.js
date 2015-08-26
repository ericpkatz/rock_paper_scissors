var app = angular.module("my_world", ['ngRoute']);
app.config(function($routeProvider, $locationProvider){
   $routeProvider 
    .when("/", {
        controller: 'HomeCtrl',
        templateUrl: '/templates/home.html'
    })
    .when("/things", {
        controller: 'ThingsCtrl',
        templateUrl: '/templates/things.html'
    })
    .when("/things/:id/edit", {
        controller: 'ThingsEditCtrl',
        templateUrl: '/templates/things_edit.html'
    })
    .when("/things/new", {
        controller: 'ThingsNewCtrl',
        templateUrl: '/templates/things_new.html'
    })
    .when("/people", {
        controller: 'PeopleCtrl',
        templateUrl: '/templates/people.html'
    })
    .when("/login", {
        controller: 'LoginCtrl',
        templateUrl: '/templates/login.html'
    })
    .when("/logout", {
        controller: 'LoginCtrl',
        templateUrl: '/templates/login.html'
    });
    $locationProvider.html5Mode(true);
});

app.run(function(AuthSvc, $injector){
    // $injector.get('$http').defaults.transformRequest = function(data, headersGetter){
      // headersGetter()['Authorization'] = 'bar';
      // if(data){
        // data.poop = true;
        // return angular.toJson(data);
      // }
    // }
    AuthSvc.tryLogin();
});
