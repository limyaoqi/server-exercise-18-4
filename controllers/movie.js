// load all the models
const Movie = require("../models/movie");

const getMovies = async (genre, rating) => {
  try {
    let movies = [];
    if (genre) {
      movies = await Movie.find({ genre: genre });
    } else if (rating) {
      movies = await Movie.find({ rating: { $gt: rating } });
    } else {
      movies = await Movie.find();
    }
    return movies;
  } catch (error) {
    throw new Error(error);
  }
};

// add
const addMovie = async (title, director, release_year, genre, rating) => {
  const newMovie = new Movie({
    title,
    director,
    release_year,
    genre,
    rating,
  });
  await newMovie.save();
  return newMovie;
};

// update
const updateMovie = async (
  movie_id,
  title,
  director,
  release_year,
  genre,
  rating
) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    movie_id,
    {
      title,
      director,
      release_year,
      genre,
      rating,
    },
    {
      new: true,
    }
  );
  return updatedMovie;
};


module.exports = {
  getMovies,
  addMovie,
  updateMovie,
};
