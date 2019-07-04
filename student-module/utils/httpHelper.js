module.exports.createHttpResponse = (ctx, code, message) => {
    ctx.body = { message: message };
    ctx.status = code;
}