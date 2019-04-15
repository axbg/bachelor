const Koa = require('koa');
const json = require('koa-json');

const PORT = require("./config").PORT;
const router = require("./routes");

const app = new Koa();

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log("flow - student module back-end started");
	console.log("running on http://localhost:" + PORT);
})