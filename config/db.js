var mongoose = require("mongoose");
var Promise = require('bluebird');
var Thing = mongoose.model('thing');

module.exports = {
    connect: connect,
    seed: seed
};

var _connection = null;

function connect(){
  if(_connection)
    return _connection;
  _connection = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN || "mongodb://localhost:27017/my_world");
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
        return Thing.remove({});
      })
      .then(function(){
        return Thing.create([
          {
            name: 'Rock',
            price: 1.50
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
      })
      .then(function(things){
        resolve(things); 
      })
      .catch(function(err){
        reject(err);
      });
  });
}
