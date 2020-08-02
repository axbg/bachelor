const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_HOST = process.env.DB_HOST || 'localhost';
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const INITIAL_URL = process.env.IS_PROD ? '' : 'http://localhost';

const DEV_ENV = {
  BASE_URL: INITIAL_URL,
  STUDENT_BASE_URL: INITIAL_URL,
  MAILING_BASE_URL: INITIAL_URL,
  ADMIN_BASE_URL: INITIAL_URL,
  ENROLLMENT_BASE_URL: INITIAL_URL,
  PAYMENT_BASE_URL: INITIAL_URL,
  VOLUNTEER_BASE_URL: INITIAL_URL,
  SCREENING_MODULE_URL: INITIAL_URL,
  GATEWAY_MODULE_PORT: process.env.GATEWAY_PORT || 8000,
  STUDENT_MODULE_PORT: process.env.STUDENT_PORT || 8001,
  MAILING_MODULE_PORT: process.env.MAILING_PORT || 8002,
  ENROLLMENT_MODULE_PORT: process.env.ENROLLMENT_PORT || 8003,
  VOLUNTEER_MODULE_PORT: process.env.VOLUNTEER_PORT || 8004,
  PAYMENT_MODULE_PORT: process.env.PAYMENT_PORT || 8005,
  ADMIN_MODULE_PORT: process.env.ADMIN_PORT || 8006,
  SCREENING_MODULE_PORT: process.env.SCREENING_PORT || 8007,
};

const PROD_ENV = {
  BASE_URL: INITIAL_URL,
  STUDENT_BASE_URL: 'http://flow-student',
  MAILING_BASE_URL: 'http://flow-mailing',
  ADMIN_BASE_URL: 'http://flow-admin',
  ENROLLMENT_BASE_URL: 'http://flow-enrollment',
  PAYMENT_BASE_URL: 'http://flow-payment',
  VOLUNTEER_BASE_URL: 'http://flow-volunteer',
  SCREENING_MODULE_URL: 'http://flow-screening',
  GATEWAY_MODULE_PORT: process.env.GATEWAY_PORT || 80,
  STUDENT_MODULE_PORT: process.env.STUDENT_PORT || 80,
  MAILING_MODULE_PORT: process.env.MAILING_PORT || 80,
  ENROLLMENT_MODULE_PORT: process.env.ENROLLMENT_PORT || 80,
  VOLUNTEER_MODULE_PORT: process.env.VOLUNTEER_PORT || 80,
  PAYMENT_MODULE_PORT: process.env.PAYMENT_PORT || 80,
  ADMIN_MODULE_PORT: process.env.ADMIN_PORT || 80,
  SCREENING_MODULE_PORT: process.env.SCREENING_PORT || 80,
};

const MODULES_CONFIG = process.env.IS_PROD ? PROD_ENV : DEV_ENV;

module.exports = {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  MODULES_CONFIG,
};
