var agent = require('supertest-as-promised').agent(require('../../app'));
var chai = require('chai');
var expect = chai.expect;
var db = require('../../config/db');
var jwt = require('jwt-simple');

describe('thingsRoute', function(){
  var rock, paper, scissors, user, authToken;
  beforeEach(function(done){
    db.seed()
      .then(function(data){
        rock = data.things[0];
        paper = data.things[1];
        scissors = data.things[2];
        user = data.user;
        authToken = { Auth : jwt.encode(user._id, process.env.SECRET || 'foo') };
        done();
      });
  });

  describe('/things', function(){
    it('returns a list of things', function(){
      return agent.get('/api/things')
        .expect(200)
        .expect(function(res){
          var things = res.body;
          expect(things[0].name).to.eq('Paper');
        });
    });
  });

  describe('/things/:id', function(){
    it('returns a thing', function(){
      return agent.get('/api/things/' + rock._id)
        .expect(200)
        .expect(function(res){
          var thing = res.body;
          expect(thing.name).to.eq('Rock');
        });
    });
  });

  describe('POST /things/:id', function(){
    describe('using a valid token', function(){
      it('updates a thing', function(){
        return agent
          .post('/api/things/' + rock._id)
          .send({name: 'Roc', price: 1.25})
          .set(authToken)
          .expect(200)
          .expect(function(res){
            var thing = res.body;
            expect(thing.name).to.eq('Roc');
            expect(thing.price).to.eq(1.25);
          });
      });
    });
    describe('using an invalid token', function(){
      it('returns 401', function(){
        return agent
          .post('/api/things/' + rock._id)
          .send({name: 'Roc', price: 1.25})
          .expect(401)
      });
    });
  });

  describe('POST /things', function(){
    describe('using a valid token', function(){
      describe('and a new name', function(){
        it('creates a new thing', function(){
          return agent
            .post('/api/things')
            .send({name: 'Roc', price: 1.25})
            .set(authToken)
            .expect(200)
            .expect(function(res){
              var thing = res.body;
              expect(thing.name).to.eq('Roc');
              expect(thing.price).to.eq(1.25);
            });
        });
      });
      describe('and a non unique name', function(){
        it('returns an error', function(){
          return agent
            .post('/api/things')
            .send({name: 'Rock', price: 1.25})
            .set(authToken)
            .expect(422)
            .then(function(res){
              expect(res.body.code).to.eq(11000);
            
            })
            .catch(function(err){
              console.log(err);
            });
        });
      });
    });
  });

});
