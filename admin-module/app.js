const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const db = require('./models/index').database;
const initDb = require('./utils/init').initDb;
const PORT = require("./config").PORT;
const router = require("./routes");
const errorHandlingMiddleware = require('./utils/errorHandlingMiddleware').errorHandlingMiddleware;

const app = new Koa();

// db.sync({force: true})
db.sync();
setTimeout(() => initDb(), 1000);

app.use(cors());
app.use(json());
app.use(bodyParser());

app.use(errorHandlingMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log("flow - admin module back-end started");
	console.log("running on http://localhost:" + PORT);
})

