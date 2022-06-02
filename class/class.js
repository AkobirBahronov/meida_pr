const callback = require("../config/callback");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

module.exports = class DemoClass {
  constructor(Model, Request, Response, Next) {
    this.Model = Model;
    this.req = Request;
    this.res = Response;
    this.next = Next;
  }

  // create data without  file
  async createData() {
    const { Model, req, res, next } = this;
    const data = new Model({ ...req.body, uuid: uuidv4() });
    try {
      const result = await data.save();
      res.json(callback.callbackSuccessJson(result, "created"));
    } catch (err) {
      res.json(callback.callbackErrorJson(err, "error"));
    }
  }

  // getAll
  async getAll(...populate) {
    const { Model, req, res, next } = this;
    const currentPage = req.query.page || 1;
    const perPage = 10;
    await Model.find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate([...populate])
      .exec((error, data) => {
        if (error) {
          res.json(callback.callbackErrorJson(error, "error"));
        } else {
          res.json(callback.callbackSuccessJson(data, "received"));
        }
      });
  }

  // getOne
  async getOne(...populate) {
    const { Model, req, res, next } = this;
    await Model.findById(req.params.id)
      .populate([...populate])
      .exec((error, data) => {
        if (error) {
          res.json(callback.callbackErrorJson(error, "error"));
        } else {
          res.json(callback.callbackSuccessJson(data, "received"));
        }
      });
  }

  // create data with file
  async createDataWithFile() {
    const { Model, req, res, next } = this;

    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
      const { filename } = item;
      arrayFiles.push(filename);
    }
    try {
      const data = await Model.create({ ...req.body, files: arrayFiles });
      const result = await data.save();
      res.json(callback.callbackSuccessJson(result, "created"));
    } catch (err) {
      res.json(callback.callbackErrorJson(err, "error"));
    }
  }

  // update data detail only
  async updateDataDetails() {
    const { Model, req, res, next } = this;
    try {
      const data = await Model.findByIdAndUpdate(req.params.id);
      for (const key in req.body) {
        data[key] = req.body[key];
      }
      const result = await data.save();
      res.json(callback.callbackSuccessJson(result, "updated"));
    } catch (err) {
      res.json(callback.callbackErrorJson(err, "error"));
    }
  }

  // update data file
  async updateDataFiles(fileStoragePathName) {
    const { Model, req, res, next } = this;
    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
      const { filename } = item;
      arrayFiles.push(filename);
    }
    try {
      const { files } = await Model.findById(req.params.id).select({
        files: 1,
      });

      files.forEach((filesLink) => {
        const dataPath = path.join(
          __dirname,
          `../public/uploads/${fileStoragePathName}/${filesLink}`
        );
        fs.unlink(dataPath, (err) => {
          [];
        });
      });

      const data = await Model.findByIdAndUpdate(req.params.id);
      for (const key in req.body) {
        data[key] = req.body[key];
      }
      data.files = arrayFiles;
      const result = await data.save();
      res.json(callback.callbackSuccessJson(result, "updated"));
    } catch (err) {
      res.json(callback.callbackErrorJson(err, "error"));
    }
  }

  // delete data detail
  async deleteDataDetail() {
    const { Model, req, res, next } = this;
    try {
      const result = await Model.findByIdAndDelete(req.params.id);
      res.json(callback.callbackSuccessJson(result, "deleted"));
    } catch (err) {
      res.json(callback.callbackErrorJson(err, "error"));
    }
  }

  // delete data with files
  async deleteDataWithFiles(fileStoragePathName) {
    const { Model, req, res, next } = this;
    try {
      const { files } = await Model.findById(req.params.id).select({
        files: 1,
      });

      files.forEach((filesLink) => {
        const dataPath = path.join(
          __dirname,
          `../public/uploads/${fileStoragePathName}/${filesLink}`
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
  }
};
