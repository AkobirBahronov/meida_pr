const DemoClass = require("../class/class");
const callback = require("../config/callback");
const DeadlineModel = require("../model/deadlineModel");
const SubscriptionModel = require("../model/subscriptionModel");
const UserModel = require("../model/userModel");

exports.getAllSubscriptions = async (req, res, next) => {
  const result = new DemoClass(SubscriptionModel, req, res, next);
  result.getAll();
};

exports.getSubscription = async (req, res, next) => {
  const result = new DemoClass(SubscriptionModel, req, res, next);
  result.getOne();
};

exports.buySubscription = async (req, res, next) => {
  try {
    const subscription = await SubscriptionModel.findById(req.params.id);
    const user = await UserModel.findByIdAndUpdate(req.userId);
    if (user.balance < subscription.price) {
      throw new Error(
        "Insufficient funding in your budget, please fill it up."
      );
    }
    user.balance -= subscription.price;
    user.status = "vip";
    const deadlineDate = new Date();
    deadlineDate.setMonth(deadlineDate.getMonth() + subscription.duration);
    const deadline = new DeadlineModel({
      user_ID: req.userId,
      subscription_ID: req.params.id,
      deadline: deadlineDate,
    });
    await deadline.save();
    const result = await user.save();

    res.json(callback.callbackSuccessJson(result, "received"));
  } catch (err) {
    res.json(callback.callbackErrorJson(err, err.message));
  }
};

exports.createSubscription = async (req, res, next) => {
  const result = new DemoClass(SubscriptionModel, req, res, next);
  result.createData();
};

exports.updateSubscription = async (req, res, next) => {
  const result = new DemoClass(SubscriptionModel, req, res, next);
  result.updateDataDetails();
};

exports.deleteSubscription = async (req, res, next) => {
  const result = new DemoClass(SubscriptionModel, req, res, next);
  result.deleteDataDetail();
};
