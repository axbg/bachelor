const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = require('../models').Student;
const User = require('../models').User;

const JWT_SECRET = require('../config').JWT_SECRET;

const findByCredentials = async (email, password) => {
  if (email.includes('@')) {
    return findStudentByCredentials(email, password);
  }

  return findUserByCredentials(email, password);
};

const findStudentByCredentials = async (email, password) => {
  const student = await Student.findOne({
    where: {
      email: email,
    },
    attributes: ['id', 'email', 'password'],
    raw: true,
  });

  if (!student || !bcrypt.compareSync(password, student.password)) {
    return;
  }

  return generateJWT(student, 'STUDENT');
};

const findUserByCredentials = async (email, password) => {
  const user = await User.findOne({
    where: {
      username: email,
    },
    attributes: ['id', 'username', 'password'],
    raw: true,
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return;
  }

  return generateJWT(user, 'USER');
};

const generateJWT = (entity, type) => {
  return type === 'STUDENT' ? jwt.sign({ id: entity.id, email: entity.email, type: type }, JWT_SECRET) :
        jwt.sign({ id: entity.id, username: entity.username, type: type }, JWT_SECRET);
};

module.exports = {
  findByCredentials,
};
