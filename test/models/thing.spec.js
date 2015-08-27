var chai = require('chai');
var expect = chai.expect;
var Thing = require('../../models/things');
var User = require('../../models/user');
var db = require('../../config/db');

describe('thing', function(){
  var rock, paper, scissors;
  beforeEach(function(done){
    db.seed()
      .then(function(results){
        rock = results.things[0]; 
        done();
      });
  
  });

  it('exists', function(){
    expect(Thing).to.be.defined
  });

  it('rock is in database', function(){
    expect(rock.name).to.eq('Rock');
  });

  it('rock is on sale', function(){
    expect(rock.onSale).to.eq(true);
  });
});
