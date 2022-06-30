const DemoClass = require("../class/class");
const { Cast } = require("../models");

exports.getCasts = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.fetchAndCache("casts");
};

exports.getCast = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.getOne();
};

exports.createCast = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.createDataWithFile();
};

exports.updateCastDetails = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.updateDataDetails();
};

exports.updateCastPhoto = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.updateDataFiles("cast");
};

exports.deleteCast = async (req, res, next) => {
  const result = new DemoClass(Cast, req, res, next);
  result.deleteDataWithFiles("cast");
};
