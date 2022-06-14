const payment = require('./payment.config');

require('dotenv').config();

module.exports = {
  ...payment,
  jwt_key: process.env.JWT_KEY,
  jwt_time: '2h',
  port: process.env.DEV_PORT,
  database_url: process.env.DATABASE_URL,
  database_option: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
