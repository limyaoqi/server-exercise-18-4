const express = require("express");

//create express router for movies
const router = express.Router();

const Movie = require("../models/movie");
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movie = await getMovies(genre, rating);
    return res.status(200).send(movie);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movies = await Movie.findOne({ _id: req.params.id });
    return res.status(200).send(movies);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

/*
  CRUD | REST
  C - Create | POST
  R - Read | GET
  U - update | PUT / PATCH
  D - Delete | DELETE
*/

// Route for add new movie
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newMovie = await addMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );
    return res.status(200).send(newMovie);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

// Route for update movie
router.put("/:id", async (req, res) => {
  try {
    const movie_id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedMovie = await updateMovie(
      movie_id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Route for delete movie
router.delete("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = Movie.findByIdAndDelete(movieId);
    return res.status(200).send("deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

module.exports = router;
