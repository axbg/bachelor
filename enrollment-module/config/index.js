const PORT = process.env.ENROLLMENT_PORT || 8003;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const GATEWAY_ADDRESS = process.env.GATEWAY_ADDRESS || 'http://localhost:8000';
const MAIL_ADDRESS = GATEWAY_ADDRESS + '/mail/send';

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  GATEWAY_ADDRESS,
  MAIL_ADDRESS,
};
