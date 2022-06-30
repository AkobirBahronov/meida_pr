const DemoClass = require("../class/class");
const { Language } = require("../models");

exports.getLanguages = async (req, res, next) => {
  const result = new DemoClass(Language, req, res, next);
  result.fetchAndCache("language");
};

exports.getLanguage = async (req, res, next) => {
  const result = new DemoClass(Language, req, res, next);
  result.getOne();
};

exports.createLanguage = async (req, res, next) => {
  const result = new DemoClass(Language, req, res, next);
  result.createData();
};

exports.updateLanguage = async (req, res, next) => {
  const result = new DemoClass(Language, req, res, next);
  result.updateDataDetails();
};

exports.deleteLanguage = async (req, res, next) => {
  const result = new DemoClass(Language, req, res, next);
  result.deleteDataDetail();
};
