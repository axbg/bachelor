const PORT = process.env.VOLUNTEER_PORT || 8004;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const REDIS_QUEUE = process.env.REDIS_QUEUE || 'redis-queue';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || 'localhost';
const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY || 'PUBLIC_VAPID_KEY';
const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY || 'PRIVATE_VAPID_KEY';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'user@example.com'

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  REDIS_QUEUE,
  REDIS_PORT,
  REDIS_ADDRESS,
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY,
  VAPID_EMAIL
};
