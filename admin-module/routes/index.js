const Router = require('koa-router');

const adminController = require('../controllers');
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;
const withAdminValidation = require('../services/middleware').withAdminValidation;

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'flow - admin module' };
});

router.use(withSecurityHeaders).use(withAdminValidation);

router.get('/volunteers', adminController.getVolunteers);

router.patch('/volunteer', adminController.updateVolunteerRoleAndPosition);

router.patch('/solve-position-request', adminController.solvePositionRequest);

module.exports = router;
