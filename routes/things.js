var express = require("express");
var router = express.Router();
var Thing = require("../models/things")
var jwt = require("jwt-simple");
var middleware = require('../config/middleware');

var checkAuthentication = middleware.checkAuthentication;

router.get("/", function(req, res){
   Thing.find({}).sort('name').then(function(things){
       res.send(things);
   }); 
});

router.get("/:id", function(req, res){
   Thing.findById(req.params.id).then(function(thing){
       res.send(thing);
   }); 
});

router.post("/:id", checkAuthentication, function(req, res){
   Thing.findById(req.params.id)
    .then( function(thing){
      thing.name = req.body.name;
      thing.price = req.body.price;
      return thing.save();
    })
    .then(
      function(thing){
         res.send(thing);
      },
      function(err){
       res.status(422); 
       res.send(err);
      }
    );
});

router.post("/", checkAuthentication, function(req, res){
   var thing = new Thing(req.body);
   thing.save(function(err, _thing){
      if(err){
         res.status(422); 
         res.send(err);
      }
      else
         res.send(thing);
   });
});


router.post("/:id/delete", checkAuthentication, function(req, res){
   Thing.remove({_id: req.params.id}, function(err){
      if(err){
         res.status(422); 
         res.send(err);
      }
      else
         res.send({});
   });
});

module.exports = router;
