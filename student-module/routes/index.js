const Router = require('koa-router');
const router = new Router();
const studentController = require("../controllers/index");

router.get("/", async (ctx) => {
    ctx.body = { message: "flow - student module" };
})

router.get("/documents/:id", studentController.getDocument);

router.post("/create-student", studentController.createStudent);

router.post("/login", async (ctx) => {
    //the actual login will be done inside the auth gateway
    //this endpoint will retrieve data such as Options, profile informations
    //credits, etc
    //if the password should be changed, etc
    ctx.body = { message: "flow - student module - student login data" };
})

router.post("/credits", async (ctx) => {
    ctx.body = { message: "flow - student module - student credits purchase" };
})

router.post("/options", async (ctx) => {
    ctx.body = { message: "flow - student module - get options" };
})

router.post("/options", async (ctx) => {
    ctx.body = { message: "flow - student module - add option" };
})

router.delete("/options", async (ctx) => {
    ctx.body = { message: "flow - student module - delete option" };
})

router.put("/password", async (ctx) => {
    ctx.body = { message: "flow - student module - student password change" };
})

module.exports = router;