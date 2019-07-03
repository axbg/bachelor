const FlowError = class FlowError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, FlowError);
    }
}

const generateError = (message, code) => {
    throw new FlowError(message, code);
}

module.exports = {
    FlowError,
    generateError
}