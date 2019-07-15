const Router = require('koa-router');
const router = new Router();
const userController = require("../controllers/index");
const withSecurityHeaders = require('../services/middleware').withSecurityHeaders;

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - volunteer module" };
})

router.post("/create", userController.createUser);

router.use(withSecurityHeaders);

router.get('/load', userController.loadUser);

router.get('/search-student/:search', userController.searchStudent);

router.post('/generate-order-number', userController.generateOrderNumber);

router.get('/positions', userController.getPositions);

router.post('/position-request', userController.createPositionRequest);

router.post('/flow', userController.createFlow);

router.post('/notify-student', userController.notifyStudent);

router.post('/notify-students', userController.notifyStudents);

router.post('/notify-volunteer', userController.notifyUser);

router.get('/faculties', userController.getFaculties);

router.get('/roles', userController.getRoles);

router.post('/subscribe', userController.subscribeNotifications);

module.exports = router;