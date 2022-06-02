const DemoClass = require("../class/class");
const YearModel = require("../model/yearModel");

exports.getYears = async (req, res, next) => {
  const result = new DemoClass(YearModel, req, res, next);
  result.getAll();
};

exports.getYear = async (req, res, next) => {
  const result = new DemoClass(YearModel, req, res, next);
  result.getOne();
};

exports.createYear = async (req, res, next) => {
  const result = new DemoClass(YearModel, req, res, next);
  result.createData();
};

exports.updateYear = async (req, res, next) => {
  const result = new DemoClass(YearModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteYear = async (req, res, next) => {
  const result = new DemoClass(YearModel, req, res, next);
  result.deleteDataDetail();
};
