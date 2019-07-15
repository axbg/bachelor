const generateError = require('../utils/FlowError').generateError;
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const Position = require('../models/index').Position;
const PositionRequest = require('../models/index').PositionRequest;
const sequelize = require('sequelize');
const redis = require('redis');
const sendNotification = require('../utils/moduleAdapter').sendNotification;
const REDIS_ADDRESS = require('../config/index').REDIS_ADDRESS;
const REDIS_PORT = require('../config/index').REDIS_PORT;

const redisClient = redis.createClient(REDIS_PORT, REDIS_ADDRESS);

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

const solvePositionRequest = async (authorization, positionRequestId, response) => {
    positionRequestId || generateError("Position identifier is not present", 400);
    response || generateError("Response is not present", 400);

    const positionRequest = await PositionRequest.findOne({ where: { id: positionRequestId }, include: [{ model: User, attributes: ['facultyId'] }] });

    if (positionRequest) {
        if (response) {
            await User.update({ positionId: positionRequest.positionId }, { where: { id: positionRequest.userId } });
            sendNotification(authorization, positionRequest.userId);
        }

        await PositionRequest.update({ read: true, solved: response }, { where: { id: positionRequestId } });
        redisClient.publish("flow-position-request", positionRequest.user.facultyId);
    }
}

module.exports = {
    getVolunteers,
    updateVolunteerRoleAndPosition,
    solvePositionRequest
}