class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static alreadyExists(msg) {
        return new ApiError(409, msg || "Already exists");
    }

    static badRequest(msg) {
        return new ApiError(400, msg || "Bad request");
    }

    static internal(msg) {
        return new ApiError(400, msg || "Internal server error");
    }

    static notFound(msg) {
        return new ApiError(404, msg || "Not found");
    }

    static unauthorized(msg) {
        return new ApiError(401, msg || "Unauthorized");
    }

    static unavailable(msg) {
        return new ApiError(503, msg || "Service unavailable");
    }
}

module.exports = ApiError;