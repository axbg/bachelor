const Router = require('koa-router');
const router = new Router();
const adminController = require("../controllers/index");
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;
const withAdminValidation = require('../services/middleware').withAdminValidation;

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - admin module" };
})

router.use(withSecurityHeaders);
//router.use(withAdminValidation);

router.get('/volunteers', adminController.getVolunteers);

router.patch('/volunteer', adminController.updateVolunteerRoleAndPosition);

module.exports = router;