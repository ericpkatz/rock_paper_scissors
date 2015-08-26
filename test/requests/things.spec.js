var agent = require('supertest-as-promised').agent(require('../../app'));
var chai = require('chai');
var expect = chai.expect;
var db = require('../../config/db');

describe('thingsRoute', function(){
  var rock, paper, scissors;
  beforeEach(function(done){
    db.seed()
      .then(function(things){
        rock = things[0];
        paper = things[1];
        scissors = things[2];
        done();
      });
  });

  describe('/things', function(){
    it('returns a list of things', function(){
      return agent.get('/api/things')
        .expect(200)
        .expect(function(res){
          console.log(res.text);
          var things = JSON.parse(res.text);
          expect(things[0].name).to.eq('Paper');
        });
    });
  });

  describe('/things/:id', function(){
    it('returns a thing', function(){
      return agent.get('/api/things/' + rock._id)
        .expect(200)
        .expect(function(res){
          var thing = JSON.parse(res.text);
          expect(thing.name).to.eq('Rock');
        });
    });
  });

});
