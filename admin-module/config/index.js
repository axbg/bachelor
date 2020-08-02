const PORT = process.env.ADMIN_PORT || 8006;
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || 'database';
const DB_USERNAME = process.env.DB_USERNAME || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const REDIS_QUEUE = process.env.REDIS_QUEUE || 'flow-queue';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || 'localhost';
const GATEWAY_ADDRESS = process.env.GATEWAY_ADDRESS || 'http://localhost:8000';
const VOLUNTEER_NOTIFICATION_ADDRESS = GATEWAY_ADDRESS + '/volunteer/notify-volunteer';

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  REDIS_QUEUE,
  REDIS_PORT,
  REDIS_ADDRESS,
  VOLUNTEER_NOTIFICATION_ADDRESS,
};
