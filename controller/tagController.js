const DemoClass = require("../class/class");
const TagModel = require("../model/tagModel");

exports.getTags = async (req, res, next) => {
  const result = new DemoClass(TagModel, req, res, next);
  result.getAll();
};

exports.getTag = async (req, res, next) => {
  const result = new DemoClass(TagModel, req, res, next);
  result.getOne();
};

exports.createTag = async (req, res, next) => {
  const result = new DemoClass(TagModel, req, res, next);
  result.createData();
};

exports.updateTag = async (req, res, next) => {
  const result = new DemoClass(TagModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteTag = async (req, res, next) => {
  const result = new DemoClass(TagModel, req, res, next);
  result.deleteDataDetail();
};
