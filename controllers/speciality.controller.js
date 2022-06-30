const DemoClass = require("../class/class");
const { Speciality } = require("../models");

exports.getSpecialities = async (req, res, next) => {
  const result = new DemoClass(Speciality, req, res, next);
  result.fetchAndCache("speciality")
};

exports.getSpeciality = async (req, res, next) => {
  const result = new DemoClass(Speciality, req, res, next);
  result.getOne();
};

exports.createSpeciality = async (req, res, next) => {
  const result = new DemoClass(Speciality, req, res, next);
  result.createData();
};

exports.updateSpeciality = async (req, res, next) => {
  const result = new DemoClass(Speciality, req, res, next);
  result.updateDataDetails();
};

exports.deleteSpeciality = async (req, res, next) => {
  const result = new DemoClass(Speciality, req, res, next);
  result.deleteDataDetail();
};
