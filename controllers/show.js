// load all the models
const Show = require("../models/show");

const getShows = async (filter) => {
  try {
      const shows = await Show.find(filter);
    return shows;
  } catch (error) {
    throw new Error(error);
  }
};

// add
const addShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const newShow = new Show({
    title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  await newShow.save();
  return newShow;
};

// update
const updateShow = async (
  show_id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const updatedShow = await Show.findByIdAndUpdate(
    show_id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true,
    }
  );
  return updatedShow;
};


module.exports = {
  getShows,
  addShow,
  updateShow,
};
