const mongoose = require("mongoose");

const itinerariesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  personImage: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  hashtags: {type: Array, required: true},
  CityID: [{ type: mongoose.Types.ObjectId, ref: "city", required: true }],
  likes: { type: Array },
  comments:  [{
    comment: {type: String},
    name: {type: String},
    urlImage: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "persona"},
}],
});

const itinerary = mongoose.model("itinerary", itinerariesSchema);
module.exports = itinerary;
