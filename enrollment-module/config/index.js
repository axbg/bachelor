const PORT = 8003;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const GATEWAY_ADDRESS = "http://localhost:8000";
const HOST_ADDRESS = process.env.HOST_ADDRESS ? process.env.HOST_ADDRESS : "localhost";
const MAIL_ADDRESS = GATEWAY_ADDRESS + "/mail/send";
const REDIS = process.argv[6];

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REDIS,
    GATEWAY_ADDRESS,
    HOST_ADDRESS,
    MAIL_ADDRESS
}