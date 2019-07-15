const PORT = 8005;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const HOST_ADDRESS = process.env.HOST_ADDRESS ? process.env.HOST_ADDRESS : "localhost";
const STRIPE_SECRET_KEY = "sk_test_xkCfVpyy84XfSjsdctIwbM5D00v0Jart3d";
const CREDIT_PRICE = 1000;
const REDIS = process.argv[6];

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REDIS,
    CREDIT_PRICE,
    STRIPE_SECRET_KEY
}