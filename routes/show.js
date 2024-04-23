const express = require("express");
const router = express.Router();

const Show = require("../models/show");
const {
  getShows,
  addShow,
  updateShow,
} = require("../controllers/show");

router.get("/", async (req, res) => {
  try {
    const keys = Object.keys(req.query);
    let filter = {};
    keys.forEach((key) => {
      filter[key] = req.query[key];
    });
    const shows = await getShows(filter);
    if (shows.length === 0) {
      return res.status(404).send("No shows found matching the criteria.");
    }
    return res.send(shows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const shows = await Show.findById(req.params.id);
    return res.send(shows);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newShow = await addShow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    return res.status(200).send(newShow);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const show_id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedMovie = await updateShow(
      show_id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
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

router.delete("/:id", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    return res.send("deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

module.exports = router;
