const PORT = 8008;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const GATEWAY_ADDRESS = process.env.GATEWAY_ADDRESS || 'http://localhost:8000';
const MAIL_ADDRESS = GATEWAY_ADDRESS + '/mail/send';

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  MAIL_ADDRESS,
};
