const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-body-parser');
const cors = require('koa-cors');

const PORT = require("./config").PORT;
const router = require("./routes");
const database = require("./models").database;

const app = new Koa();

//this will be removed
database.sync();

app.use(cors());
app.use(json());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log("flow - student module back-end started");
	console.log("running on http://localhost:" + PORT);
})