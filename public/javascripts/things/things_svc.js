angular.module("my_world")
    .factory("ThingsSvc", function($q, $http, AuthSvc){
         function getThings(){
             var dfd = $q.defer();
             $http.get("/api/things")
                .then(function(response){
                    dfd.resolve(response.data);
                });
             return dfd.promise;
         }
         
         function getThing(id){
             var dfd = $q.defer();
             $http.get("/api/things/" + id)
                .then(function(response){
                    dfd.resolve(response.data);
                });
             return dfd.promise;
         }
         
         function save(thing){
             var dfd = $q.defer();
             var url = '/api/things';
             if(thing._id)
               url = '/api/things/' + thing._id;
             $http({
                method: 'POST',
                url: url,
                data: thing,
                headers: AuthSvc.getHeaders()

             })
                .then( function(thing){
                   dfd.resolve(thing); 
                })
                .catch( function(err){
                    dfd.reject(err.data);  
                });
             return dfd.promise;
         }

         function deleteThing(thing){
             var dfd = $q.defer();
             $http({
               method: 'POST',
               url: "/api/things/" + thing._id + "/delete",
               headers: AuthSvc.getHeaders()
              })
                .then( function(){
                   dfd.resolve(); 
                })
                .catch( function(err){
                    dfd.reject(err.data);  
                });
             return dfd.promise;
             
         }
         return {
             getThing: getThing,
             getThings: getThings,
             save: save,
             deleteThing: deleteThing
         };
    });
