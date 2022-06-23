const DemoClass = require("../class/class");
const { Review } = require("../models");

exports.getReviews = async (req, res, next) => {
    const result = new DemoClass(Review, req, res, next);
    result.getAll();
};

exports.getReview = async (req, res, next) => {
    const result = new DemoClass(Review, req, res, next);
    result.getOne();
};

exports.createReview = async (req, res, next) => {
    const result = new DemoClass(Review, req, res, next);
    result.createData();
};

exports.updateReview = async (req, res, next) => {
    const result = new DemoClass(Review, req, res, next);
    result.updateDataDetails();
};

exports.deleteReview = async (req, res, next) => {
    const result = new DemoClass(Review, req, res, next);
    result.deleteDataDetail();
};
