const PORT = process.env.PORT || 8001;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const GATEWAY_ADDRESS = process.env.GATEWAY_ADDRESS || 'http://localhost:8000';
const MAIL_ADDRESS = GATEWAY_ADDRESS + '/mail/send';

const CRITERIA_TYPES = {
  BAC_AVERAGE: 'BAC_AVERAGE',
  BAC_RO: 'BAC_RO',
  AVERAGE_9: 'AVERAGE_9',
  AVERAGE_10: 'AVERAGE_10',
  AVERAGE_11: 'AVERAGE_11',
  AVERAGE_12: 'AVERAGE_12',
};

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  MAIL_ADDRESS,
  CRITERIA_TYPES,
  JWT_SECRET,
};
