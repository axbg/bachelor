const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const findByCredentials = require('./services/login').findByCredentials;
const extractFromJWT = require('./services/authentication').extractFromJWT;

const MODULES_CONFIG = require('./config').MODULES_CONFIG;
const JWT_SECRET = require('./config').JWT_SECRET;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:4000' }));

app.get('/', async (req, res) => {
  res.status(200).send({ message: 'flow - gateway module' });
});

// public routes
app.post('/login', bodyParser.json(), async (req, res) => {
  const jwt = await findByCredentials(req.body.email, req.body.password);

  if (jwt) {
    return res.status(200).send({ jwt: jwt });
  }

  return res.status(400).send({ message: 'Credentials not matched.' });
});

app.use('/student/create', proxy({
  target: MODULES_CONFIG.STUDENT_BASE_URL + ':' + MODULES_CONFIG.STUDENT_MODULE_PORT, pathRewrite: {
    '/student/create': '/create',
  },
}));

app.use('/volunteer/create', proxy({
  target: MODULES_CONFIG.VOLUNTEER_BASE_URL + ':' + MODULES_CONFIG.VOLUNTEER_MODULE_PORT, pathRewrite: {
    '/volunteer/create': '/create',
  },
}));

app.use('/socket.io', proxy({
  target: MODULES_CONFIG.SCREENING_MODULE_URL + ':' + MODULES_CONFIG.SCREENING_MODULE_PORT, pathRewrite: {
    '/screening': '',
  }, ws: true,
}));

// private routes
app.use(jwt({ secret: JWT_SECRET }));

app.use('/student', proxy({
  target: MODULES_CONFIG.STUDENT_BASE_URL + ':' + MODULES_CONFIG.STUDENT_MODULE_PORT, pathRewrite: {
    '/student': '',
  },
  onProxyReq: extractFromJWT,
}));

app.use('/mail', proxy({
  target: MODULES_CONFIG.MAILING_BASE_URL + ':' + MODULES_CONFIG.MAILING_MODULE_PORT, pathRewrite: {
    '/mail': '',
  },
}));

app.use('/enrollment', proxy({
  target: MODULES_CONFIG.ENROLLMENT_BASE_URL + ':' + MODULES_CONFIG.ENROLLMENT_MODULE_PORT, pathRewrite: {
    '/enrollment': '',
  },
  onProxyReq: extractFromJWT,
}));

app.use('/volunteer', proxy({
  target: MODULES_CONFIG.VOLUNTEER_BASE_URL + ':' + MODULES_CONFIG.VOLUNTEER_MODULE_PORT, pathRewrite: {
    '/volunteer': '',
  },
  onProxyReq: extractFromJWT,
}));

app.use('/payment', proxy({
  target: MODULES_CONFIG.PAYMENT_BASE_URL + ':' + MODULES_CONFIG.PAYMENT_MODULE_PORT, pathRewrite: {
    '/payment': '',
  },
  onProxyReq: extractFromJWT,
}));

app.use('/admin', proxy({
  target: MODULES_CONFIG.ADMIN_BASE_URL + ':' + MODULES_CONFIG.ADMIN_MODULE_PORT, pathRewrite: {
    '/admin': '',
  },
  onProxyReq: extractFromJWT,
}));

app.listen(MODULES_CONFIG.GATEWAY_MODULE_PORT,
  () => console.log('Gateway module started on ' + MODULES_CONFIG.BASE_URL + ':' + MODULES_CONFIG.GATEWAY_MODULE_PORT));
