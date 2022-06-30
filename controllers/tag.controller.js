const DemoClass = require("../class/class");
const { Tag } = require("../models");
const _ = require('underscore')

exports.createData_1 = async (req, res) => {
  const count = 20000
  const recursion = async (RECURSION_NUMBER) => {
    if (RECURSION_NUMBER > 0) {
      const result = new Tag({
        name: {
          uz: _.sample(['AAA', 'AAB', 'AAC', 'AAD', 'AAE', 'AAF', 'AAG', 'ABA', 'ABB', 'ABC', 'ACA', 'ABA', "CCC", "BBA", "BBC"]),
          ru: _.sample(['AAA', 'AAB', 'AAC', 'AAD', 'AAE', 'AAF', 'AAG', 'ABA', 'ABB', 'ABC', 'ACA', 'ABA', "CCC", "BBA", "BBC"]),
          en: _.sample(['AAA', 'AAB', 'AAC', 'AAD', 'AAE', 'AAF', 'AAG', 'ABA', 'ABB', 'ABC', 'ACA', 'ABA', "CCC", "BBA", "BBC"]),
        },
      })
      await result.save()
      console.log("Saved", result)


      recursion(RECURSION_NUMBER - 1)
    }
  }
  recursion(count)
  res.json("success")
}


exports.getTagsWithCache = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.fetchAndCache('tags');
};

exports.getTags = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.getAll();
};

exports.getTag = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.getOne();
};

exports.createTag = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.createData();
};

exports.updateTag = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.updateDataDetails();
};

exports.deleteTag = async (req, res, next) => {
  const result = new DemoClass(Tag, req, res, next);
  result.deleteDataDetail();
};
