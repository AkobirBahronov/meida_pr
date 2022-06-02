const DemoClass = require("../class/class");
const SpecialityModel = require("../model/specialityModel");

exports.getSpecialities = async (req, res, next) => {
  const result = new DemoClass(SpecialityModel, req, res, next);
  result.getAll();
};

exports.getSpeciality = async (req, res, next) => {
  const result = new DemoClass(SpecialityModel, req, res, next);
  result.getOne();
};

exports.createSpeciality = async (req, res, next) => {
  const result = new DemoClass(SpecialityModel, req, res, next);
  result.createData();
};

exports.updateSpeciality = async (req, res, next) => {
  const result = new DemoClass(SpecialityModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteSpeciality = async (req, res, next) => {
  const result = new DemoClass(SpecialityModel, req, res, next);
  result.deleteDataDetail();
};
