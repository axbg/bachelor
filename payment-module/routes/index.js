const Router = require('koa-router');
const router = new Router();
const paymentController = require('../controllers/index');
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - payment module" };
});

router.use(withSecurityHeaders);    

router.post('/update-credits', paymentController.updateCredits);

router.post('/update-tax', paymentController.updateTax);

module.exports = router;