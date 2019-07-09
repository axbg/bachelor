const generateError = require('../utils/FlowError').generateError;
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const Position = require('../models/index').Position;

const validateUser = async (user) => {
    user.username || generateError("Username not present", 400);
    user.password || generateError("Password not present", 400);
    user.facultyId || generateError("Faculty identifier not present", 400);

    const findUser = await User.findOne({ where: { username: user.username } });
    !findUser || generateError("Username already exists", 400);
}



const createUser = async (user) => {
    await validateUser(user);
    await User.create(user);
    return user;
}

const loadUser = async (userId) => {
    return await User.findOne({
        where: { id: userId },
        attributes: {
            exclude: ['id', 'password']
        },
        include: [
            { model: Role },
            { model: Position }
        ]
    });
}

module.exports = {
    createUser,
    loadUser
}