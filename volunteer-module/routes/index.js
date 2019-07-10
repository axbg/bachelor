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

//TO DO
router.get('/notify-students');

module.exports = router;