const Router = require('koa-router');

const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - volunteer module' };
});

router.use(withSecurityHeaders);

module.exports = router;
