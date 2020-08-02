const Router = require('koa-router');

const adminController = require('../controllers');
const withAdminValidation = require('../services/middleware').withAdminValidation;

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - admin module' };
});

router.use(withAdminValidation);

router.post('/dry-sort', adminController.drySort);

router.post('/sort', adminController.sort);

router.get('/iterations', adminController.getIterations);

router.get('/documents/:iteration', adminController.downloadDocuments);

module.exports = router;
