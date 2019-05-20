const axios = require('axios');
const Student = require('../models/index').Student;
const Criteria = require('../models/index').Criteria;
const MAIL_MODULE_PATH = require('../config/constants').MAIL_MODULE_PATH;
const CRITERIA_TYPES = require('../config/constants').CRITERIA_TYPES;
const validateStudent = require('../services/student').validateStudent;

module.exports.getDocuments = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get documents" };
}

module.exports.getDocument = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get detailed document" };
}

module.exports.register = async (ctx) => {
    const mailData = {
        message: "This is a dummy message",
        from: "bisagalexstefan@gmail.com",
        title: "Welcome to Flow!",
        destination: ""
    };

    validateStudent();

    const student = await Student.create(ctx.request.body);

    const bacAverage = Criteria.create({ type: CRITERIA_TYPES.BAC_AVERAGE, value: ctx.request.body.bacAverage, studentId: student.id });
    const bacRomanian = Criteria.create({ type: CRITERIA_TYPES.BAC_RO, value: ctx.request.body.bacRomanian, studentId: student.id });
    const average9 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_9, value: ctx.request.body.average9, studentId: student.id });
    const average10 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_10, value: ctx.request.body.average10, studentId: student.id });
    const average11 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_11, value: ctx.request.body.average11, studentId: student.id });
    const average12 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_12, value: ctx.request.body.average12, studentId: student.id });

    ctx.body = "Registration successful!";
    ctx.status = 201;

    Promise.all([bacAverage, bacRomanian, average9, average10, average11, average12]).then(result => {
        mailData.destination = student.email;
        axios.post(MAIL_MODULE_PATH, { ...mailData }).then(result => { })
            .catch(error => console.log(error));
    });
}