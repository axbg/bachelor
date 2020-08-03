const Student = require('../models').Student;
const sendMail = require('../utils/moduleAdapter').sendMail;

const enrollStudent = async (studentId) => {
  await Student.update({ enrolled: true }, { where: { id: studentId } });
};

const sendEnrollmentMail = async (authToken, document, studentId) => {
  const student = await Student.findOne({ where: { id: studentId } });
  const emailContent = 'Bine ai venit la ASE' + student.firstname + ' ' + student.lastname;
  sendMail(authToken, 'Admitere ASE', emailContent, student.email, document);
};

const getWithdrawals = async () => {
  return await Student.findAll(
      {
        where: { withdrawPortfolio: true },
        attributes: ['id', 'firstname', 'lastname', 'cnp'], raw: true,
      });
};

module.exports = {
  enrollStudent,
  sendEnrollmentMail,
  getWithdrawals,
};
