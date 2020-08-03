const PORT = process.env.PAYMENT_PORT || 8005;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'STRIPE_SECRET_KEY';
const CREDIT_PRICE = 1000;

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  CREDIT_PRICE,
  STRIPE_SECRET_KEY,
};
