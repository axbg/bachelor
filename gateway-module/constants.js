
const JWT_SECRET = "licenta2019";
const BASE_URL = process.env.IS_PROD ? "" : "http://localhost";
const STUDENT_BASE_URL = process.env.IS_PROD ? "http://flow-student" : BASE_URL;
const MAILING_BASE_URL = process.env.IS_PROD ? "http://flow-mailing" : BASE_URL;
const ADMIN_BASE_URL = process.env.IS_PROD ? "http://flow-admin" : BASE_URL;
const ENROLLMENT_BASE_URL = process.env.IS_PROD ? "http://flow-enrollment" : BASE_URL;
const PAYMENT_BASE_URL = process.env.IS_PROD ? "http://flow-payment" : BASE_URL;
const VOLUNTEER_BASE_URL = process.env.IS_PROD ? "http://flow-volunteer" : BASE_URL;
const SCREENING_MODULE_URL = process.env.IS_PROD ? "http://flow-screening" : BASE_URL;

const GATEWAY_MODULE_PORT = process.env.IS_PROD ? 80 : 8000;
const STUDENT_MODULE_PORT = process.env.IS_PROD ? 80 : 8001;
const MAILING_MODULE_PORT = process.env.IS_PROD ? 80 : 8002;
const ENROLLMENT_MODULE_PORT = process.env.IS_PROD ? 80 : 8003;
const VOLUNTEER_MODULE_PORT = process.env.IS_PROD ? 80 : 8004;
const PAYMENT_MODULE_PORT = process.env.IS_PROD ? 80 : 8005;
const ADMIN_MODULE_PORT = process.env.IS_PROD ? 80 : 8006;
const SCREENING_MODULE_PORT = 8007;

module.exports = {
    JWT_SECRET,
    BASE_URL,
    STUDENT_BASE_URL,
    MAILING_BASE_URL,
    ADMIN_BASE_URL,
    ENROLLMENT_BASE_URL,
    PAYMENT_BASE_URL,
    VOLUNTEER_BASE_URL,
    SCREENING_MODULE_URL,
    GATEWAY_MODULE_PORT,
    STUDENT_MODULE_PORT,
    MAILING_MODULE_PORT,
    ENROLLMENT_MODULE_PORT,
    VOLUNTEER_MODULE_PORT,
    PAYMENT_MODULE_PORT,
    ADMIN_MODULE_PORT,
    SCREENING_MODULE_PORT
}