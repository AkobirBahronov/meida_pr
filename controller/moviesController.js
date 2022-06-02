const DemoClass = require("../class/class");
const MoviesModel = require("../model/moviesModel");

exports.getAllMovies = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.getAll();
};

exports.getMovie = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.getOne();
};

exports.createMovie = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.createDataWithFile();
};

exports.updateMovieDetails = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.updateDataDetails();
};

exports.updateMovieRef = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.updateDataDetails();
};

exports.updateMovieFiles = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.updateDataFiles("public/uploads/movies");
};

exports.deleteMovie = async (req, res, next) => {
  const result = new DemoClass(MoviesModel, req, res, next);
  result.deleteDataWithFiles("public/uploads/movies");
};