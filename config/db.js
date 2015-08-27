var mongoose = require("mongoose");
var Promise = require('bluebird');
var Thing = mongoose.model('thing');
var User = mongoose.model('user');

module.exports = {
    connect: connect,
    seed: seed
};

var _connection = null;

function connect(){
  if(_connection)
    return _connection;
  _connection = new Promise(function(resolve, reject){
    var connString = process.env.CONN || "mongodb://localhost:27017/my_world";
    if(process.env.NODE_ENV == 'test')
      connString += "_test";
    mongoose.connect(connString);
    mongoose.connection.on("open", function(){
        resolve(mongoose.connection.name);
    });
    mongoose.connection.on("error", function(err){
      reject(err);
    });
  });
  return _connection;
}

function seed(){
  return new Promise(function(resolve, reject){
    connect()
      .then( function(){
        var thingsRemoval = Thing.remove({});
        var userRemoval = User.remove({});
        Promise.all([thingsRemoval, userRemoval]);
      })
      .then(function(){
        var things = Thing.create([
          {
            name: 'Rock',
            price: 1.50,
            onSale: true
          },
          {
            name: 'Paper',
            price: 5.50
          },
          {
            name: 'Scissors',
            price: 2.50 
          }]
        );
        var user = User.create({username: 'prof', password: 'pw'})
        return Promise.all([things, user]);


      })
      .then(function(results){
        resolve({ things: results[0], user: results[1] }); 
      })
      .catch(function(err){
        reject(err);
      });
  });
}
