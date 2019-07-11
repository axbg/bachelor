const PORT = 8004;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const HOST_ADDRESS = process.env.HOST_ADDRESS ? process.env.HOST_ADDRESS : "localhost";
const REDIS_QUEUE = process.env.REDIS_QUEUE ? process.env.REDIS_QUEUE: "flow";
const REDIS_PORT = 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS ? process.env.REDIS_ADDRESS: "localhost";
const PUBLIC_VAPID_KEY = "BDqGJBZQVFfS6C4vrlfY3OxrdA5j0M5QCWB9XXEVv_ZfP99De_Mo00CHQ9w9d-pgLWlbEWnCrS-HH-2iZWeBBXE";
const PRIVATE_VAPID_KEY = "5kkTyyl0lo107xqMEj1VWhz1IIOzFKen_my7jJpxnlw";

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
    PRIVATE_VAPID_KEY
}