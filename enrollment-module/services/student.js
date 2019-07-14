const generateError = require('../utils/FlowError').generateError;
const Student = require('../models/index').Student;
const sendMail = require('../utils/moduleAdapter').sendMail;

const enrollStudent = async (studentId) => {
    await Student.update({ enrolled: true }, { where: { id: studentId } });
}

const sendEnrollmentMail = async (authToken, document, studentId) => {
    //create mail template
    const student = await Student.findOne({ where: { id: studentId } });
    sendMail(authToken, "Admitere ASE", "Bine ai venit la ase " + student.firstname + " " + student.lastname, "bisagalexstefan@gmail.com", document);
}

const getWithdrawals = async () => {
    return await Student.findAll({ where: { withdrawPortfolio: true }, attributes: ['id', 'firstname', 'lastname', 'cnp'], raw: true });
}

module.exports = {
    enrollStudent,
    sendEnrollmentMail,
    getWithdrawals
}