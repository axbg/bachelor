module.exports.extractFromJWT = (proxyReq, req, res) => {
  validateType(req.baseUrl, req.user.type, res);

  proxyReq.setHeader('X-ID', req.user.id);
  proxyReq.setHeader('X-EMAIL', req.user.email || '');
  proxyReq.setHeader('X-USERNAME', req.user.username || '');
  proxyReq.setHeader('X-TYPE', req.user.type);
};

const validateType = (baseUrl, type, res) => {
  if ((type === 'STUDENT' && (!baseUrl.includes('/student') && !baseUrl.includes('payment')))) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
