const sequelize = require('sequelize');
const redis = require('redis');

const User = require('../models').User;
const Role = require('../models').Role;
const Position = require('../models').Position;
const PositionRequest = require('../models').PositionRequest;
const generateError = require('../utils/FlowError').generateError;
const sendNotification = require('../utils/moduleAdapter').sendNotification;

const REDIS_ADDRESS = require('../config').REDIS_ADDRESS;
const REDIS_PORT = require('../config').REDIS_PORT;

const redisClient = redis.createClient(REDIS_PORT, REDIS_ADDRESS);

const clearVolunteerInput = (user) => {
  const cleanInput = {};

  if (user.positionId) cleanInput.positionId = user.positionId;
  if (user.roleId) cleanInput.roleId = user.roleId;

  return cleanInput;
};

const getVolunteers = async (id, facultyId) => {
  return await User.findAll({
    where: { id: { [sequelize.Op.not]: id }, facultyId: facultyId }, attributes: ['id', 'username'],
    include: [{ model: Role }, { model: Position }],
  });
};

const updateVolunteerRoleAndPosition = async (user, currentUserId, facultyId) => {
  user.userId || generateError('User identifier is not present', 400);
  await User.update({ ...clearVolunteerInput(user) }, { where: { id: user.userId, facultyId: facultyId } });
  return await getVolunteers(currentUserId);
};

const solvePositionRequest = async (authorization, positionRequestId, response, facultyId) => {
  positionRequestId || generateError('Position identifier is not present', 400);
  response || generateError('Response is not present', 400);

  const positionRequest = await PositionRequest.findOne({
    where: { id: positionRequestId },
    include: [{ model: User, attributes: ['facultyId'] }],
  });

  if (positionRequest) {
    if (response) {
      const updated = await User.update(
        { positionId: positionRequest.positionId },
        {
          where:
          {
            id: positionRequest.userId,
            facultyId: facultyId
          }
        });

      if (updated[0] != 1) {
        generateError("User is under your supervision", 400);
      }

      sendNotification(authorization, positionRequest.userId);
    }

    await PositionRequest.update({ read: true, solved: response }, { where: { id: positionRequestId } });
    redisClient.publish('flow-position-request', positionRequest.user.facultyId);
  }
};

module.exports = {
  getVolunteers,
  updateVolunteerRoleAndPosition,
  solvePositionRequest,
};
