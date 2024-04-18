const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, require:true },
  director: { type: String },
  release_year: { type: Number },
  genre: { type: String },
  rating: { type: Number },
});


// module.exports = mongoose.model("Movie", movieSchema);
const Movie = mongoose.model("Movie",movieSchema)
module.exports = Movie
