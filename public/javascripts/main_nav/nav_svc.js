angular.module("my_world")
    .factory("NavSvc", function(AuthSvc){
        var selectedPath="/";
        
        function Tab(config){
           this.path = config.path; 
           this.title = config.title;
           this.authenticated = config.authenticated;
        }
        
        Tab.prototype.selected = function(){
           return selectedPath == this.path; 
        };
        
        Tab.prototype.hide = function(){
            if(this.authenticated === true){
                if(!AuthSvc.user.authenticated())
                    return true; 
                
            }
            if(this.authenticated === false){
                if(AuthSvc.user.authenticated())
                    return true; 
            }
        }
        var tabs = [
            new Tab(
            {
                path: "/",
                title: "Home"
            }),
            new Tab(
            {
                path: "/things",
                title: "Things"
            }),
            new Tab(
            {
                path: "/people",
                title: "People"
            }),
            new Tab(
            {
                path: "/login",
                title: "Login",
                authenticated: false
            }),
            new Tab(
            {
                path: "/logout",
                title: "Logout",
                authenticated: true 
            })
        ];
       return {
           tabs: tabs,
           setSelectedPath: function(path){
              selectedPath = path; 
           },
           getSelectedPath: function(path){
               return selectedPath;
           }
       }; 
    });