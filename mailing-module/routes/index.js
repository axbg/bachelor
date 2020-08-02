const Router = require('koa-router');

const mailingController = require('../controllers');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - mailing module' };
});

router.post('/send', mailingController.sendEmail);

module.exports = router;
