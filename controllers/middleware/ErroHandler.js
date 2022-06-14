const chalk = require("chalk");
const config = require("../../config/index.js");
const ApiError = require("../services/ApiError.js")

exports.errorHandler = (err, req, res, next) => {
    if (config.NODE_ENV == 'development') console.log(chalk.red.underline(err));
    if (err instanceof ApiError) {
        return res.status(err.code).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal server error" });
    next()
}