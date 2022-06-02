const DemoClass = require("../class/class");
const LanguageModel = require("../model/languageModel");

exports.getLanguages = async (req, res, next) => {
  const result = new DemoClass(LanguageModel, req, res, next);
  result.getAll();
};

exports.getLanguage = async (req, res, next) => {
  const result = new DemoClass(LanguageModel, req, res, next);
  result.getOne();
};

exports.createLanguage = async (req, res, next) => {
  const result = new DemoClass(LanguageModel, req, res, next);
  result.createData();
};

exports.updateLanguage = async (req, res, next) => {
  const result = new DemoClass(LanguageModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteLanguage = async (req, res, next) => {
  const result = new DemoClass(LanguageModel, req, res, next);
  result.deleteDataDetail();
};
