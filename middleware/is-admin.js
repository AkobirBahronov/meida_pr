const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretAvlohubToken");
  } catch (err) {
    err.status = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const admin = await UserModel.findById(decodedToken.userId);
  if (admin.role !== "admin") {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};