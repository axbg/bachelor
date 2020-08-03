const PORT = process.env.MAILING_PORT || 8002;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || 'MAILGUN_API_KEY';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'MAILGUN_DOMAIN';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_HOST = process.env.DB_HOST || 'localhost';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "user@example.com";

module.exports = {
  PORT,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  ADMIN_EMAIL
};
