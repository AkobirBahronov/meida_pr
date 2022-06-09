const express = require("express");
const app = express();
const { port } = require("./config/index");
const connection = require("./database/index");
const bodyParser = require("body-parser");

const cors = require("cors");

const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const yearRouter = require("./routes/yearRoute");
const languageRouter = require("./routes/languageRoute");
const countryRouter = require("./routes/countryRoute");
const genreRouter = require("./routes/genreRoute");
const tagRouter = require("./routes/tagRoute");
const specialityRouter = require("./routes/specialityRoute");
const castRouter = require("./routes/castRoute");
const moviesRouter = require("./routes/moviesRoute");
const videoRouter = require("./routes/videoRoute");
const ratingRouter = require("./routes/ratingRoute");
const subscriptionRouter = require("./routes/subscriptionRoute");

// Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connection();

app.use("/auth", userRouter);
app.use("/categories", categoryRouter);
app.use("/years", yearRouter);
app.use("/languages", languageRouter);
app.use("/countries", countryRouter);
app.use("/genres", genreRouter);
app.use("/tags", tagRouter);
app.use("/specialities", specialityRouter);
app.use("/casts", castRouter);
app.use("/movies", moviesRouter);
app.use("/videos", videoRouter);
app.use("/ratings", ratingRouter);
app.use("/subscriptions", subscriptionRouter);

// server
app.listen(port, () => {
  console.log("Server is running");
});
