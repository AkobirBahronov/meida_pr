const DemoClass = require("../class/class");
const { Genre } = require("../models");

exports.getGenres = async (req, res, next) => {
  const result = new DemoClass(Genre, req, res, next);
  result.getAll();
};

exports.getGenre = async (req, res, next) => {
  const result = new DemoClass(Genre, req, res, next);
  result.getOne();
};

exports.createGenre = async (req, res, next) => {
  const result = new DemoClass(Genre, req, res, next);
  result.createData();
};

exports.updateGenre = async (req, res, next) => {
  const result = new DemoClass(Genre, req, res, next);
  result.updateDataDetails();
};

exports.deleteGenre = async (req, res, next) => {
  const result = new DemoClass(Genre, req, res, next);
  result.deleteDataDetail();
};
