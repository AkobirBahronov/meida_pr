const { oson_token, merchant_id } = require('../config/index');
// const { v4: uuidv4 } = require('uuid');
// const md5 = require('md5');
const axios = require('axios');
const { User, Journal } = require('../models');
const ObjectId = require('mongodb').ObjectId;

exports.createPayment = async (req, res, next) => {
  const { token } = req.headers;
  const { amount, method } = req.body;
  if (method == 'pay') {
    if (token !== oson_token) {
      res.json({
        success: false,
        state: 4,
        message: 'Token not found',
      });
    } else {
      await User.findById({ _id: ObjectId(req.userId) }).exec(
        (error, data) => {
          if (error) {
            res.json({
              success: false,
              state: 3,
              message: 'Account not found',
            });
          } else {
            if (amount < 9) {
              res.json({
                success: false,
                state: 5,
                message: 'Amount is less from minimum',
              });
            } else {
              const transaction_id = Math.floor(
                Math.random() * 10000000000000000000000000000000
              );
              console.log(data);
              axios({
                url: 'https://api.oson.uz/api/invoice/create',
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  token: token,
                },
                data: {
                  merchant_id: merchant_id,
                  transaction_id: transaction_id,
                  phone: '+998987654321',
                  user_account: data.uuid,
                  amount: amount,
                  currency: 'UZS',
                  comment: `Оплата заказа N-${data.uuid}`,
                  return_url: 'http://localhost:3000/payment/check',
                  lifetime: 30,
                  lang: 'ru',
                },
              }).then((response) => {
                const data = response.data;
                res.json(data);
              });
            }
          }
        }
      );
    }
  } else {
    res.json({
      success: false,
      message: 'Method is not defined',
    });
  }
};

exports.check = async (req, res, next) => {
  axios({
    url: 'https://api.oson.uz/api/invoice/status',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    data: {
      merchant_id: merchant_id,
      transaction_id: transaction_id,
    },
  }).then(async (response) => {
    const data = response.data;
    console.log(data);
    if (data.status === 'PAID') {
      const journal = new Journal({
        user_ID: req.userId,
        system: 'oson',
        status: 'paid',
        amount: amount,
        transaction_id: transaction_id,
        pay_url: data.pay_url,
      });
      await journal.save();
    }
  });
};

exports.checkPaymentStatus = async (req, res, next) => {
  const { token } = req.headers;
  const { transaction_id, method } = req.body;
  if (method == 'check_status') {
    if (token !== oson_token) {
      res.json({
        success: false,
        state: 4,
        message: 'Token not found',
      });
    } else {
      await User.findById({ _id: ObjectId(req.userId) }).exec(
        (error, data) => {
          if (error) {
            res.json({
              success: false,
              state: 3,
              message: 'Account not found',
            });
          } else {
            axios({
              url: 'https://api.oson.uz/api/invoice/status',
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
              },
              data: {
                merchant_id: merchant_id,
                transaction_id: transaction_id,
              },
            }).then((response) => {
              const data = response.data;
              res.json(data);
            });
          }
        }
      );
    }
  } else {
    res.json({
      success: false,
      message: 'Method is not defined',
    });
  }
};

exports.reversePayment = async (req, res, next) => {
  const { token } = req.headers;
  const { transaction_id, method } = req.body;
  if (method == 'reverse') {
    if (token !== oson_token) {
      res.json({
        success: false,
        state: 4,
        message: 'Token not found',
      });
    } else {
      await User.findById({ _id: ObjectId(req.userId) }).exec(
        (error, data) => {
          if (error) {
            res.json({
              success: false,
              state: 3,
              message: 'Account not found',
            });
          } else {
            axios({
              url: 'https://api.oson.uz/api/invoice/reverse',
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
              },
              data: {
                merchant_id: merchant_id,
                transaction_id: transaction_id,
              },
            }).then((response) => {
              const data = response.data;
              res.json(data);
            });
          }
        }
      );
    }
  } else {
    res.json({
      success: false,
      message: 'Method is not defined',
    });
  }
};
