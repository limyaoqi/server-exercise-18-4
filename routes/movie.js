const express = require("express");

//create express router for movies
const router = express.Router();

const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    let movie = await Movie.find();
    // if (req.query.genre && req.query.rating) {
    //   movie = await Movie.find({
    //     genre: req.query.genre,
    //     rating: { $gt: req.query.rating },
    //   });
    // }
    if (req.query.genre) movie = await Movie.find({ genre: req.query.genre });
    if (req.query.rating)
      movie = await Movie.find({ rating: { $gt: req.query.rating } });
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

module.exports = router;
