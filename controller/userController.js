const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {
  callbackSuccessJson,
  callbackErrorJson,
} = require("../config/callback");
const UserModel = require("../model/userModel");
const { validationResult } = require("express-validator");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akobirmailserver@gmail.com",
    pass: "mailserve1303",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.signUp = async (req, res, next) => {
  const { username, email, password, role, link } = req.body;
  try {
    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
      const { filename } = item;
      arrayFiles.push(filename);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const uuid = uuidv4();
    const user = new UserModel({
      username,
      email,
      password: hashedPw,
      link,
      files: arrayFiles,
      role,
      uuid,
    });

    const result = await user.save();
    res.status(201).json(callbackSuccessJson(result, "signed up"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.updateUserDetails = async (req, res, next) => {
  const userId = req.userId;
  const { username, email, password, link } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const user = UserModel.findByIdAndUpdate(userId);

    user.username = username;
    user.email = email;
    user.password = hashedPw;
    user.link = link;

    const result = await user.save();
    res.status(201).json(callbackSuccessJson(result, "successfully updated"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.updateUserPhoto = async (req, res, next) => {
  const userId = req.userId;
  try {
    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
      const { filename } = item;
      arrayFiles.push(filename);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const { files } = await UserModel.findById(userId).select({
      files: 1,
    });

    files.forEach((filesLink) => {
      const dataPath = path.join(
        __dirname,
        `../public/uploads/user/${filesLink}`
      );
      fs.unlink(dataPath, (err) => {
        [];
      });
    });

    const user = UserModel.findByIdAndUpdate(userId);

    user.files = arrayFiles;

    const result = await user.save();
    res.status(201).json(callbackSuccessJson(result, "successfully updated"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.getLoggedUserDetail = async (req, res, next) => {
  const userId = req.userId;
  try {
    const result = await UserModel.findById(userId);
    res.status(201).json(callbackSuccessJson(result, "successfully updated"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    const users = await UserModel.find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(201).json(callbackSuccessJson(users, "successfully updated"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "secretAvlohubToken",
      { expiresIn: "1h" }
    );
    const data = { token: token, userId: user._id.toString() };
    res.status(200).json(callbackSuccessJson(data, "logged in"));
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};

exports.postPasswordResetRequest = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      res.json(callbackErrorJson(err, err.message));
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("No account with that email found.");
      error.statusCode = 404;
      throw error;
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    res.status(200).json(callbackSuccessJson({}, "sent to email"));

    transporter
      .sendMail({
        to: req.body.email,
        from: "akobir@avlohub.com",
        subject: "Password Reset",
        html: `
    <p>You requested password reset</p>
    <p>Click this <a href='http://localhost:3000/reset/${token}'>link<a/>  to set a new password.</p>
    `,
        // TODO
      })
      .catch((err) => {
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
      });
  });
};

exports.postNewPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const passwordToken = req.body.passwordToken;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const user = await UserModel.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(200).json(callbackSuccessJson({ user }, "reset"));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.deleteUserItself = async (req, res, next) => {
  try {
    const { files } = await UserModel.findById(req.userId).select({
      files: 1,
    });

    files.forEach((filesLink) => {
      const dataPath = path.join(
        __dirname,
        `../public/uploads/user/${filesLink}`
      );
      fs.unlink(dataPath, (err) => {
        [];
      });
    });

    const result = await Model.findByIdAndDelete(req.userId);
    res.json(callback.callbackSuccessJson(result, "deleted"));
  } catch (err) {
    res.json(callback.callbackErrorJson(err, "error"));
  }
};
exports.deleteUserByAdmin = async (req, res, next) => {
  try {
    const { files } = await UserModel.findById(req.params.id).select({
      files: 1,
    });

    files.forEach((filesLink) => {
      const dataPath = path.join(
        __dirname,
        `../public/uploads/user/${filesLink}`
      );
      fs.unlink(dataPath, (err) => {
        [];
      });
    });
    const result = await Model.findByIdAndDelete(req.params.id);
    res.json(callback.callbackSuccessJson(result, "deleted"));
  } catch (err) {
    res.json(callback.callbackErrorJson(err, "error"));
  }
};
