const PORT = process.env.SCREENING_PORT || 8007;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const REDIS_QUEUE = process.env.REDIS_QUEUE || 'redis_queue';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || 'localhost';
const SECRET_ADMIN_TOKEN = process.env.SCREENING_SECRET_ADMIN_TOKEN || 'SECRET_ADMIN_TOKEN';

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  REDIS_QUEUE,
  REDIS_PORT,
  REDIS_ADDRESS,
  SECRET_ADMIN_TOKEN,
};
