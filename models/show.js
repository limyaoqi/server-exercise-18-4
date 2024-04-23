const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  premiere_year: { type: Number, required: true },
  end_year: { type: Number },
  seasons: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
