const generateError = require('../utils/FlowError').generateError;
const Student = require('../models/index').Student;
const Criteria = require('../models/index').Criteria;
const CRITERIA_TYPES = require('../config/index').CRITERIA_TYPES;
const sendMail = require('../utils/moduleAdapter').sendMail;
const crypto = require('crypto');

const generateRandomPassword = () => {
    return crypto.randomBytes(20).toString('hex');
}

const isEmailUnique = async (email) => {
    const student = await Student.findOne({
        where: {
            email: email
        }
    });

    return !student ? true : false;
}

const validatePassword = async (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
}

const validateStudent = async (student) => {
    student.email || generateError("Data is not correct: email missing", 400);
    await isEmailUnique(student.email) || generateError("Email is already registered", 400);
    student.firstname || generateError("Data is not correct: firstname missing", 400);
    student.lastname || generateError("Data is not correct: lastname missing", 400);
    student.parentInitial || generateError("Data is not correct: parentInitial missing", 400);
    student.phone || generateError("Data is not correct: phone missing", 400);
    student.address || generateError("Data is not correct: address missing", 400);
    student.cnp || generateError("Data is not correct: cnp missing", 400);
    student.series || generateError("Data is not correct: series missing", 400);
    student.number || generateError("Data is not correct: number missing", 400);
    student.idPublisher || generateError("Data is not correct: idPublisher missing", 400);
    student.bacAverage || generateError("Data is not correct: bacAverage missing", 400);
    student.bacRomanian || generateError("Data is not correct:bacRomanian missing", 400);
    student.average9 || generateError("Data is not correct: average9 missing", 400);
    student.average10 || generateError("Data is not correct: average10 missing", 400);
    student.average11 || generateError("Data is not correct: average11 missing", 400);
    student.average12 || generateError("Data is not correct: average12 missing", 400);
}

const createCriteria = async (studentData, studentId) => {
    const bacAverage = Criteria.create({ type: CRITERIA_TYPES.BAC_AVERAGE, value: studentData.bacAverage, studentId: studentId });
    const bacRomanian = Criteria.create({ type: CRITERIA_TYPES.BAC_RO, value: studentData.bacRomanian, studentId: studentId });
    const average9 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_9, value: studentData.average9, studentId: studentId });
    const average10 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_10, value: studentData.average10, studentId: studentId });
    const average11 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_11, value: studentData.average11, studentId: studentId });
    const average12 = Criteria.create({ type: CRITERIA_TYPES.AVERAGE_12, value: studentData.average12, studentId: studentId });
}

const sendRegistrationMail = (student) => {
    //add mail template here
    const message = "Welcome to flow " + student.firstname + "\nCredentials\nusername: " + student.email + "\npassword: " + student.password + "\n";
    sendMail("Flow - Welcome", message, student.email);
}

const createStudent = async (student) => {

    await validateStudent(student);

    student.password = generateRandomPassword();

    const registeredStudent = await Student.create(student);

    await createCriteria(student, registeredStudent.id);

    return student;
}

const changePassword = async (student) => {
    if (validatePassword(student.password)) {
        await Student.update(
            {
                password: student.password
            },
            {
                where: {
                    //shold be replaced with student.id
                    //student.id will be populated by an interceptor
                    //that will get the id value from Header
                    //which was set there by the gateway module
                    id: 1
                }, 
                individualHooks: true
            }
        );
    }
}

module.exports = {
    validateStudent,
    createStudent,
    sendRegistrationMail,
    changePassword
}