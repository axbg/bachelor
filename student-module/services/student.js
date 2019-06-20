const FlowError = require('../utils/FlowError').FlowError;

module.exports.validateStudent = (data) => {
    throw new FlowError("Data is not correct", 400);
} 