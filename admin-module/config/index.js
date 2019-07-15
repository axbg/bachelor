const PORT = process.env.PORT ? process.env.PORT : 8006;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const HOST_ADDRESS = process.env.HOST_ADDRESS ? process.env.HOST_ADDRESS : "localhost";
const REDIS_QUEUE = process.env.REDIS_QUEUE ? process.env.REDIS_QUEUE: "flow";
const REDIS_PORT = 6379;
const REDIS_ADDRESS = process.env.REDIS_ADDRESS ? process.env.REDIS_ADDRESS: "localhost";
const GATEWAY_ADDRESS = "http://localhost:8000";
const VOLUNTEER_NOTIFICATION_ADDRESS = GATEWAY_ADDRESS + "/volunteer/notify-volunteer";

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REDIS_QUEUE,
    REDIS_PORT,
    REDIS_ADDRESS,
    VOLUNTEER_NOTIFICATION_ADDRESS
}