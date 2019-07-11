const Router = require('koa-router');
const router = new Router();
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - volunteer module" };
})

router.use(withSecurityHeaders);

module.exports = router;