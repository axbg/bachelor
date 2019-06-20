const Router = require('koa-router');
const router = new Router();
const mailingController = require("../controllers/index");

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - mailing module" };
})

router.post("/send", mailingController.sendEmail);

module.exports = router;