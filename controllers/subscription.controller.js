const DemoClass = require("../class/class");
const callback = require("../config/callback");
const { Subscription, Deadline, User } = require("../models");

exports.getAllSubscriptions = async (req, res, next) => {
  const result = new DemoClass(Subscription, req, res, next);
  result.fetchAndCache("subscription");
};

exports.getSubscription = async (req, res, next) => {
  const result = new DemoClass(Subscription, req, res, next);
  result.getOne();
};

exports.buySubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    const user = await User.findByIdAndUpdate(req.userId);
    if (user.balance < subscription.price) {
      throw new Error(
        "Insufficient funding in your budget, please fill it up."
      );
    }
    user.balance -= subscription.price;
    user.status = "vip";
    const deadlineDate = new Date();
    deadlineDate.setMonth(deadlineDate.getMonth() + subscription.duration);
    const deadline = new Deadline({
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
  const result = new DemoClass(Subscription, req, res, next);
  result.createData();
};

exports.updateSubscription = async (req, res, next) => {
  const result = new DemoClass(Subscription, req, res, next);
  result.updateDataDetails();
};

exports.deleteSubscription = async (req, res, next) => {
  const result = new DemoClass(Subscription, req, res, next);
  result.deleteDataDetail();
};
