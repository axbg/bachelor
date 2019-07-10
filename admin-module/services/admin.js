const generateError = require('../utils/FlowError').generateError;
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const Position = require('../models/index').Position;
const sequelize = require('sequelize');

const clearVolunteerInput = (user) => {
    let cleanInput = {};

    if (user.positionId) cleanInput.positionId = user.positionId;
    if (user.roleId) cleanInput.roleId = user.roleId;

    return cleanInput;
}

const getVolunteers = async (id) => {
    return await User.findAll({ where: { id: { [sequelize.Op.not]: id } }, attributes: ['id', 'username'], include: [{ model: Role }, { model: Position }] })
}

const updateVolunteerRoleAndPosition = async (user, currentUserId) => {
    user.userId || generateError("User identifier is not present", 400);
    await User.update({ ...clearVolunteerInput(user) }, { where: { id: user.userId } });
    return await getVolunteers(currentUserId);
}

module.exports = {
    getVolunteers,
    updateVolunteerRoleAndPosition
}