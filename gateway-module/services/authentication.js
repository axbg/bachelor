module.exports.extractFromJWT = (proxyReq, req, res) => {
    proxyReq.setHeader('x-custom', 'da');
};