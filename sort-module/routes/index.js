const Router = require('koa-router');
const router = new Router();
const adminController = require("../controllers/index");
const withAdminValidation = require('../services/middleware').withAdminValidation

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - admin module" };
})

router.use(withAdminValidation);

router.post('/dry-sort', adminController.drySort);

router.post('/sort', adminController.sort);

module.exports = router;