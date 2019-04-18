const Koa = require('koa');
const json = require('koa-json');

const PORT = require("./config").PORT;
const router = require("./routes");
const database = require("./models").database;

const app = new Koa();

//this will be removed
database.sync();

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log("flow - student module back-end started");
	console.log("running on http://localhost:" + PORT);
})