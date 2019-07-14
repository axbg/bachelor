const generateError = require('../utils/FlowError').generateError;
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const Position = require('../models/index').Position;
const PositionRequest = require('../models/index').PositionRequest;
const Faculty = require('../models/index').Faculty;
const Flow = require('../models/index').Flow;
const redis = require('redis');
const webpush = require('web-push');
const REDIS_ADDRESS = require('../config/index').REDIS_ADDRESS;
const REDIS_PORT = require('../config/index').REDIS_PORT;
const PUBLIC_VAPID_KEY = require('../config/index').PUBLIC_VAPID_KEY;
const PRIVATE_VAPID_KEY = require('../config/index').PRIVATE_VAPID_KEY;
const sequelize = require('sequelize');

const redisClient = redis.createClient(REDIS_PORT, REDIS_ADDRESS);
webpush.setVapidDetails('mailto:bisagalexstefan@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

const validateUser = async (user) => {
    user.username || generateError("Username not present", 400);
    user.password || generateError("Password not present", 400);
    user.facultyId || generateError("Faculty identifier not present", 400);

    const findUser = await User.findOne({ where: { username: user.username } });
    !findUser || generateError("Username already exists", 400);
}

const notifyRedis = (channel, message) => {
    redisClient.publish(channel, message);
}

const getVolunteers = async (id) => {
    return await User.findAll({ where: { id: { [sequelize.Op.not]: id } }, attributes: ['id', 'username'], include: [{ model: Role }, { model: Position }] })
}

const createUser = async (user) => {
    await validateUser(user);
    await User.create({ ...user, positionId: 1, roleId: 1 });
    return await getVolunteers(user.userId);
}

const subscribe = async (notificationToken, userId) => {
    notificationToken || generateError("Notification token not present", 400);
    userId || generateError("User identifier not present", 400);

    await User.update({ notificationToken: notificationToken }, { where: { id: userId } });
}

const loadUser = async (userId) => {
    return await User.findOne({
        where: { id: userId },
        attributes: {
            exclude: ['password']
        },
        include: [
            { model: Role },
            { model: Position }
        ]
    });
}

const createPositionRequest = async (request, userId) => {
    request.positionId || generateError("Position identifier is not present", 400);
    request.userId = parseInt(userId);
    const requestEntity = await PositionRequest.create({ ...request }, { include: [{ model: Position }] });
    const user = await User.findOne({ where: { id: userId } });
    notifyRedis("flow-position-request", user.facultyId);
    return await PositionRequest.findOne({ where: { id: requestEntity.id }, include: [{ model: Position }] });
}

const createFlow = async (flow, userId) => {
    flow.flow || generateError("Flow number is not present", 400);
    const currentUser = await User.findOne({ where: { id: userId } });
    await Flow.create({ flow: flow.flow, time: (new Date()).getTime(), facultyId: currentUser.facultyId });
    notifyRedis("flow-flow", currentUser.facultyId);
}

const notifyUser = async (userId) => {
    userId || generateError("User identifier not present", 400);

    const user = await user.findOne({ id: userId });

    if (user && user.notificationToken) {
        const payload = { title: "Position updated", content: "Check Flow App" };
        //endpoint, p256dh, auth
        const subscriptionData = user.notificationToken.split("#");
        const keys = { p256dh: subscriptionData[1], auth: subscriptionData[2] };
        const subscription = { endpoint: subscriptionData[0], expirationTime: null, keys: keys };

        webpush.sendNotification(subscription, payload);
    }
}

const getFaculties = async () => {
    return await Faculty.findAll({ attributes: ['id', 'name'] });
}

const getPositions = async (userId) => {
    const user = await User.findOne({ where: { id: userId }, attributes: ['facultyId'] });
    return await Position.findAll({ where: { facultyId: user.facultyId }, attributes: ['id', 'position'] });
}

const getRoles = async () => {
    return await Role.findAll({ attributes: ['id', 'role'] });
}

module.exports = {
    createUser,
    subscribe,
    loadUser,
    createPositionRequest,
    getPositions,
    createFlow,
    notifyUser,
    getFaculties,
    getRoles
}