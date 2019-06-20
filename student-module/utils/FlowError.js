module.exports.FlowError = class FlowError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, FlowError);
    }
}