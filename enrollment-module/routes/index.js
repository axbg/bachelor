const Router = require('koa-router');
const router = new Router();
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;
const enrollmentController = require('../controllers/index');

router.use(withSecurityHeaders);

router.post("/enroll-student", enrollmentController.enrollStudent);

router.get('/withdrawals', enrollmentController.getWithdrawals);

module.exports = router;