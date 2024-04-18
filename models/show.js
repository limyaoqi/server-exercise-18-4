const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  title: { type: String, require: true },
  creator: { type: String, require: true },
  premiere_year: { type: Number, require: true },
  end_year: { type: Number },
  seasons: { type: String, require: true },
  genre: { type: String, require: true },
  rating: { type: Number },
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
