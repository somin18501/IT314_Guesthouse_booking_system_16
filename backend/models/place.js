const mongoose = require("mongoose");
const PlaceSchema = new mongoose.Schema({

    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extrainfo : String,
    checkintime : Number,
    checkouttime : Number,
    maxguests : Number,
    ratings : Number,
    reviews : [String],
    owner :{type:mongoose.Schema.Types.ObjectId, ref : 'User'},
});

const PlaceModel = mongoose.model("Place", PlaceSchema);
module.exports = PlaceModel;