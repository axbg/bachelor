const Router = require('koa-router');

const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;
const enrollmentController = require('../controllers');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - enrollment module' };
});

router.use(withSecurityHeaders);

router.post('/enroll-student', enrollmentController.enrollStudent);

router.get('/withdrawals', enrollmentController.getWithdrawals);

module.exports = router;
