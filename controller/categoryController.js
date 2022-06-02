const DemoClass = require("../class/class");
const CategoryModel = require("../model/categoryModel");

exports.getCategories = async (req, res, next) => {
  const result = new DemoClass(CategoryModel, req, res, next);
  result.getAll();
};

exports.getCategory = async (req, res, next) => {
  const result = new DemoClass(CategoryModel, req, res, next);
  result.getOne();
};

exports.createCategory = async (req, res, next) => {
  const result = new DemoClass(CategoryModel, req, res, next);
  result.createData();
};

exports.updateCategory = async (req, res, next) => {
  const result = new DemoClass(CategoryModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteCategory = async (req, res, next) => {
  const result = new DemoClass(CategoryModel, req, res, next);
  result.deleteDataDetail();
};
