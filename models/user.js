var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    luckyNumber: Number
});

var User = mongoose.model("user", UserSchema);

module.exports = User;