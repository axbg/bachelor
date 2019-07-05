const Router = require('koa-router');
const router = new Router();
const studentController = require("../controllers/index");
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - student module" };
})

router.post("/create", studentController.createStudent);

router.use(withSecurityHeaders);

router.post('/change-password', studentController.changePassword);

router.get('/load-student', studentController.loadStudent);

module.exports = router;