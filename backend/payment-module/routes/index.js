const Router = require('koa-router');

const paymentController = require('../controllers');
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - payment module' };
});

router.use(withSecurityHeaders);

router.post('/update-credits', paymentController.updateCredits);

router.post('/update-tax', paymentController.updateTax);

module.exports = router;
