var mongoose = require("mongoose");
var ThingSchema = mongoose.Schema({
    name: { type: String, required:true, unique: true }, 
    price: { type: Number, required: true, default: 0 },
    onSale: { type: Boolean, default: false }
});

var Thing = mongoose.model("thing", ThingSchema);

module.exports = Thing;
