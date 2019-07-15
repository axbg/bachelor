const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "localhost";

module.exports = {
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD
}