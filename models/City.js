const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
  name: { type: String, require: true },
  img: { type: String },
  pais: { type: String },
});

const city = mongoose.model("city", citiesSchema);
module.exports = city;
