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

router.get('/load', studentController.loadStudent);

router.patch('/update/:studentId?', studentController.updateStudent);

router.post('/generate-order-number', studentController.generateOrderNumber);

router.get('/options/:studentId?', studentController.getOptions);

router.post('/create-option/:studentId?', studentController.createOption);

router.delete('/delete-option/:id/:studentId?', studentController.deleteOption);

router.patch('/withdraw', studentController.withdrawPortoflio);

router.post('/subscribe', studentController.subscriptToPush);

module.exports = router;