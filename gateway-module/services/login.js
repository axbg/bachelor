const Student = require('../models/index').Student;
const User = require('../models/index').User;

const findByCredentials = async (email, password) => {

    if (password.includes("@")) {
        return findStudentByCredentials(email, password);
    }

    return findUserByCredentials(email, password);
}

//add student_option and associated name type from FacultyProfile, criteria, flow data
const findStudentByCredentials = async (email, password) => {
    const student = await Student.findOne({
        where: {
            email: email,
            password: encryptPassword(password)
        },
        attributes: {
            exclude: ['password', 'notification_token']
        },
    });

    if (student) {
        //create jwt
        //retrieve data
        //send jwt and data
    }
}

//add roles, position, faculty
const findUserByCredentials = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email,
            password: encryptPassword(email)
        },
        attributes: {
            exclude: ['password', 'notification_token']
        }
    });

    if (user) {
        //create jwt
        //retrieve data
        //send jwt and data
    }
}

const encryptPassword = (password) => {
    return password;
}

const generateJWT = (entity) => {
    //treat differently for student and user
}

module.exports = {
    findByCredentials
}