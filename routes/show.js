const express = require("express");
const router = express.Router();

const Show = require("../models/show");

router.get("/", async (req, res) => {
  try {
    let shows = await Show.find();
    if (req.query.genre) shows = await Show.find({ genre: req.query.genre });
    if (req.query.rating)
      shows = await Show.find({ rating: { $gt: req.query.rating } });
    if (req.query.premiere_year)
      shows = await Show.find({
        premiere_year: { $gt: req.query.premiere_year },
      });
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

module.exports = router;
