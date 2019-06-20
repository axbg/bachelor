const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-body-parser');
const cors = require('koa-cors');
const jwt = require('koa-jwt');
const JWT_SECRET = require('./config/constants').JWT_SECRET;

const PORT = require("./config").PORT;
const router = require("./routes");
const database = require("./models").database;
const errorHandlingMiddleware = require('./utils/errorHandlingMiddleware').errorHandlingMiddleware;

const app = new Koa();

//this will be removed
database.sync();

app.use(cors());
app.use(json());
app.use(bodyParser());

app.use(errorHandlingMiddleware);

//data extracted from jwt will be placed inside ctx.state.user
app.use(jwt({ secret: JWT_SECRET, key: 'user' }));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log("flow - student module back-end started");
	console.log("running on http://localhost:" + PORT);
})