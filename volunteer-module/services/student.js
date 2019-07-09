const generateError = require('../utils/FlowError').generateError;
const Student = require('../models/index').Student;
const Criteria = require('../models/index').Criteria;
const Faculty = require('../models/index').Faculty;
const User = require('../models/index').User;
const StudentOption = require('../models/index').StudentOption;
const FacultyProfile = require('../models/index').FacultyProfile;
const sequelize = require('sequelize');

const findStudentByCnp = async (cnp) => {
    return await Student.findOne({
        where: {
            cnp: cnp
        },
        attributes: {
            exclude: ['id', 'password', 'notificationToken']
        },
        include: [
            { model: Criteria, as: 'criterias', attributes: ['type', 'value'] }
        ]
    })
}

const findStudentByOrderNumber = async (orderNumber, userId) => {
    const students = await Student.findAll({
        where: {
            orderNumber: orderNumber,
        },
        attributes: {
            exclude: ['id', 'password', 'notificationToken']
        },
        include: [
            { model: Criteria, as: 'criterias', attributes: ['type', 'value'] },
            { model: StudentOption, as: 'options', include: { model: FacultyProfile, include: { model: Faculty } } }
        ]
    });

    const volunteer = await User.findOne({
        where: {
            id: userId
        }
    });

    const student = students.find(student => {
        for (let i = 0; i < student.options.length; i++) {
            if (student.options[i].faculty_profile.facultyId === volunteer.facultyId) {
                return student;
            }
        }
    });

    return { ...student.toJSON(), options: undefined };
}

const produceOrderNumber = async (studentId, facultyId) => {
    await Faculty.update({ currentOrderNumber: sequelize.literal('current_order_number + 1') }, { where: { id: facultyId } });

    const faculty = await Faculty.findOne({ where: { id: facultyId } });

    Student.update({ orderNumber: faculty.currentOrderNumber }, { where: { id: studentId } });

    return faculty.currentOrderNumber;
}



const findStudent = async (search, userId) => {
    search || generateError("Search field is not present", 400);
    userId || generateError("Faculty identifier is not present", 400);
    return search.length > 10 ? findStudentByCnp(search) : findStudentByOrderNumber(search, userId);
}

const generateOrderNumber = async (student) => {
    student.studentId || generateError("Student identifier is not present", 400);

    const studentOption = await StudentOption.findOne({
        where: {
            studentId: student.studentId
        },
        include: { model: FacultyProfile, include: { model: Faculty } }
    });

    const facultyId = studentOption.faculty_profile.facultyId ? studentOption.faculty_profile.facultyId : student.facultyId;

    facultyId || generateError("Options or FacultyId is required", 400);

    return await produceOrderNumber(student.studentId, facultyId);
}

const getOptions = async (student) => {
    student.studentId || generateError("Student identifier is not present", 400);

    const options = await FacultyProfile.findAll({ raw: true });
    const selectedOptions = await StudentOption.findAll({ where: { studentId: student.studentId }, include: { model: FacultyProfile }, raw: true });

    const selectedOptionsIds = selectedOptions.map(options => options.facultyProfileId);
    const notSelectedOptions = options.filter(option => !selectedOptionsIds.includes(option.id));

    return { selectedOptions, notSelectedOptions };
}

module.exports = {
    findStudent,
    generateOrderNumber,
}