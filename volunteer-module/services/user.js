const generateError = require('../utils/FlowError').generateError;
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const Position = require('../models/index').Position;
const PositionRequest = require('../models/index').PositionRequest;
const Flow = require('../models/index').Flow;
const redis = require('redis');
const REDIS_ADDRESS = require('../config/index').REDIS_ADDRESS;
const REDIS_PORT = require('../config/index').REDIS_PORT;
const REDIS_QUEUE = require('../config/index').REDIS_QUEUE;
const redisClient = redis.createClient(REDIS_PORT, REDIS_ADDRESS);

const validateUser = async (user) => {
    user.username || generateError("Username not present", 400);
    user.password || generateError("Password not present", 400);
    user.facultyId || generateError("Faculty identifier not present", 400);

    const findUser = await User.findOne({ where: { username: user.username } });
    !findUser || generateError("Username already exists", 400);
}

const notifyRedis = (channel, message) => {
    redisClient.publish("flow", "Flow added");
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

const getPositions = async () => {
    return await Position.findAll({});
}

const createPositionRequest = async (request, userId) => {
    request.positionId || generateError("Position identifier is not present", 400);
    request.userId = parseInt(userId);
    const requestEntity = await PositionRequest.create({ ...request }, { include: [{ model: Position }] });
    notifyRedis("flow-position-request", "");
    return await PositionRequest.findOne({ where: { id: requestEntity.id }, include: [{ model: Position }] });
}

const createFlow = async (flow, userId) => {
    flow.flow || generateError("Flow number is not present", 400);
    const currentUser = await User.findOne({ where: { id: userId } });
    await Flow.create({ flow: flow.flow, time: (new Date()).getTime(), facultyId: currentUser.facultyId });
    notifyRedis("flow-flow", "");
}

module.exports = {
    createUser,
    loadUser,
    createPositionRequest,
    getPositions,
    createFlow,
}