const PORT = 8001;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "";
const REDIS = process.env.REDIS;
const JWT_SECRET = "licenta";
const PAYMENT_MODULE_IP_TAG = "payment_module_ip";
const QUEUE_IP_TAG = "queue_ip_tag";
const MAIL_MODULE_PATH = "http://localhost:8000/mail/send";
const CRITERIA_TYPES = {
    BAC_AVERAGE: "BAC_AVERAGE",
    BAC_RO: "BAC_RO",
    AVERAGE_9: "AVERAGE_9",
    AVERAGE_10: "AVERAGE_10",
    AVERAGE_11: "AVERAGE_11",
    AVERAGE_12: "AVERAGE_12"
}

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    REDIS,
    JWT_SECRET, 
    PAYMENT_MODULE_IP_TAG,
    QUEUE_IP_TAG,
    MAIL_MODULE_PATH,
    CRITERIA_TYPES
}
