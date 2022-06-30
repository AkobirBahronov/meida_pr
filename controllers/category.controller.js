const DemoClass = require("../class/class");
const { Category } = require("../models");

exports.getCategories = async (req, res, next) => {
  const result = new DemoClass(Category, req, res, next);
  result.fetchAndCache("categories");
};

exports.getCategory = async (req, res, next) => {
  const result = new DemoClass(Category, req, res, next);
  result.getOne();
};

exports.createCategory = async (req, res, next) => {
  const result = new DemoClass(Category, req, res, next);
  result.createData();
};

exports.updateCategory = async (req, res, next) => {
  const result = new DemoClass(Category, req, res, next);
  result.updateDataDetails();
};

exports.deleteCategory = async (req, res, next) => {
  const result = new DemoClass(Category, req, res, next);
  result.deleteDataDetail();
};
