const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const apps = require("./playstore");

app.get("/apps", (req, res) => {
  //code here
  const { search = "", sort, Genres } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  if (Genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        Genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card"
        );
    }
  }

  let results = apps.filter(app =>
    app.App.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (Genres) {
    results = results.filter(result => result.Genres === Genres);
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
