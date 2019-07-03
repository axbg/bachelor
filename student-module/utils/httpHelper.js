module.exports.createHttpResponse = (ctx, code, message) => {
    ctx.body = message;
    ctx.status = code;
}