const DemoClass = require("../class/class");
const CastModel = require("../model/castModel");

exports.getCasts = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.getAll();
};

exports.getCast = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.getOne();
};

exports.createCast = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.createDataWithFile();
};

exports.updateCastDetails = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.updateDataDetails();
};

exports.updateCastPhoto = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.updateDataFiles("public/uploads/cast");
};

exports.deleteCast = async (req, res, next) => {
  const result = new DemoClass(CastModel, req, res, next);
  result.deleteDataWithFiles("public/uploads/cast");
};
