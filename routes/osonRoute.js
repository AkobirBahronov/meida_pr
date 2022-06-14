const express = require('express');
const router = express.Router();
const osonController = require('../controllers/oson.controller');
const isAuth = require('../controllers/middleware/is-auth');

router.post('/pay', isAuth, osonController.createPayment);
router.post('/check', osonController.checkPaymentStatus);
router.get('/check', osonController.check);
router.post('/return', isAuth, osonController.reversePayment);

module.exports = router;
