const DemoClass = require("../class/class");
const { Movies } = require("../models");

exports.getAllMovies = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.getAll();
};

exports.getMovie = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.getOne();
};

exports.createMovie = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.createDataWithFile();
};

exports.updateMovieDetails = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.updateDataDetails();
};

exports.updateMovieRef = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.updateDataDetails();
};

exports.updateMovieFiles = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.updateDataFiles("movies");
};

exports.deleteMovie = async (req, res, next) => {
  const result = new DemoClass(Movies, req, res, next);
  result.deleteDataWithFiles("movies");
};
