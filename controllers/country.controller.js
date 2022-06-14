const DemoClass = require("../class/class");
const { Country } = require("../models");

exports.getCountries = async (req, res, next) => {
  const result = new DemoClass(Country, req, res, next);
  result.getAll();
};

exports.getCountry = async (req, res, next) => {
  const result = new DemoClass(Country, req, res, next);
  result.getOne();
};

exports.createCountry = async (req, res, next) => {
  const result = new DemoClass(Country, req, res, next);
  result.createData();
};

exports.updateCountry = async (req, res, next) => {
  const result = new DemoClass(Country, req, res, next);
  result.updateDataDetails();
};

exports.deleteCountry = async (req, res, next) => {
  const result = new DemoClass(Country, req, res, next);
  result.deleteDataDetail();
};
