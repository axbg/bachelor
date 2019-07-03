const PORT = 8001;
const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "flow";
const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : "alex";
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "forever";
const HOST_ADDRESS = process.env.HOST_ADDRESS ? process.env.HOST_ADDRESS : "localhost";
const REDIS = process.env.REDIS;
const JWT_SECRET = "licenta";
const PAYMENT_MODULE_IP_TAG = "payment_module_ip";
const QUEUE_IP_TAG = "queue_ip_tag";
const GATEWAY_ADDRESS = "http://flow-gateway";
const MAIL_ADDRESS = GATEWAY_ADDRESS + "/mail/send";
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
    MAIL_ADDRESS,
    CRITERIA_TYPES
}
