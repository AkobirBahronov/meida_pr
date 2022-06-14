const DemoClass = require("../class/class");
const { Trailer } = require("../models");

exports.getTrailers = async (req, res, next) => {
    const result = new DemoClass(Trailer, req, res, next);
    result.getAllByMovies(req.params.movies_ID);
};

exports.getTrailer = async (req, res, next) => {
    const result = new DemoClass(Trailer, req, res, next);
    result.getOne();
};

exports.createTrailer = async (req, res, next) => {
    const result = new DemoClass(Trailer, req, res, next);
    result.createDataWithFile();
};

exports.updateTrailer = async (req, res, next) => {
    const result = new DemoClass(Trailer, req, res, next);
    result.updateDataFiles();
};

exports.deleteTrailer = async (req, res, next) => {
    const result = new DemoClass(Trailer, req, res, next);
    result.deleteDataWithFiles();
};
