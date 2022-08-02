import express from "express";
// import bodyParser from "body-parser";
import recRouter from "./routes/recipes.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use("/recipes", recRouter);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "Couldn't find that for ya matey" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
