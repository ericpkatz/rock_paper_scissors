var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/things', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/things/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/things/new', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/people', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
