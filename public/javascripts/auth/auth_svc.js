angular.module("my_world")
    .factory("AuthSvc", function($q, $http, $location, $window){
        var _user = {
            authenticated: function(){
                return !!this.username;
            }
        };
        
        function setUser(response){
            _user.username = response.data.username;
            _user.luckyNumber = response.data.luckyNumber;
        }
        function authenticate(user){
           var dfd = $q.defer(); 
           $http.post("/api/session", user)
            .then(function(response){
                  $window.sessionStorage.setItem("token", response.data );
            })
            .then(getUser)
            .then(setUser)
            .then(function(){
                $location.path("/");
            })
            .catch(function(response){
                   dfd.reject(response.data); 
            });
           return dfd.promise;
        }
        
        function tryLogin(){
            if(getToken()){
                getUser() 
                    .then(setUser);
            }
            
        }
        
        function logout(){
            $window.sessionStorage.removeItem('token');
            _user.username = null;
            $location.path("/");
        }
        
        function getToken(){
            return $window.sessionStorage.getItem("token");
        }
        
        function getUser(){
            return $http.get("/api/session?token=" + getToken());
        }

        function getHeaders(){
            return { 'Auth' : getToken() }
        }

        return {
           user: _user,
           logout: logout,
           authenticate: authenticate,
           tryLogin: tryLogin,
           getToken: getToken,
           getHeaders: getHeaders
        }
        
        
    });
