const PORT = 8008;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const JWT_SECRET = "licenta2019";
const GATEWAY_ADDRESS = "http://localhost:8000";
const MAIL_ADDRESS = GATEWAY_ADDRESS + "/mail/send";

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET,
    MAIL_ADDRESS
}