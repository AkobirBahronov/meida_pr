const DemoClass = require("../class/class");
const GenreModel = require("../model/genreModel");

exports.getGenres = async (req, res, next) => {
  const result = new DemoClass(GenreModel, req, res, next);
  result.getAll();
};

exports.getGenre = async (req, res, next) => {
  const result = new DemoClass(GenreModel, req, res, next);
  result.getOne();
};

exports.createGenre = async (req, res, next) => {
  const result = new DemoClass(GenreModel, req, res, next);
  result.createData();
};

exports.updateGenre = async (req, res, next) => {
  const result = new DemoClass(GenreModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteGenre = async (req, res, next) => {
  const result = new DemoClass(GenreModel, req, res, next);
  result.deleteDataDetail();
};
