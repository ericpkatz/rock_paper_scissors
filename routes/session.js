var express = require("express");
var router = express.Router();
var jwt = require("jwt-simple");
var User = require("../models/user");

router.get('/', function(req, res){
    var token = jwt.decode(req.query.token, process.env.SECRET || 'foo');
    var _id = token.id;
    User.findById(_id)
        .then(function(user){
            user.password = null;
            res.send(user);
        });
});
router.post('/', function(req,res){
    var user = req.body;
    User.findOne({ username: user.username, password: user.password})
        .then( function(_user){
            if(!_user)
                return res.status(401).send("Bad user name and password");
            res.send(jwt.encode({id: _user._id}, process.env.SECRET || 'foo'));
        });
});

module.exports = router;