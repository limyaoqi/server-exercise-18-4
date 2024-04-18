const express = require("express");
const mongoose = require("mongoose");

const app = express();

//connect to mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);
app.use("/shows", require("./routes/show"));


app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
