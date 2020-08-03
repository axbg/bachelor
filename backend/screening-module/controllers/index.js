const redis = require('redis');

const REDIS_ADDRESS = require('../config').REDIS_ADDRESS;
const REDIS_PORT = require('../config').REDIS_PORT;
const SECRET_ADMIN_TOKEN = require('../config').SECRET_ADMIN_TOKEN;

const redisClientFlow = redis.createClient(REDIS_PORT, REDIS_ADDRESS);
const redisClientRequest = redis.createClient(REDIS_PORT, REDIS_ADDRESS);

const updateAdminGraph = require('../services/screening').updateAdminGraph;
const updatePositionRequests = require('../services/screening').updatePositionRequests;
const updateScreening = require('../services/screening').updateScreening;

const screening = async (socket) => {
  let adminId;
  const facultyId = socket.handshake.query.facultyId;

  if (socket.handshake.query.adminId && socket.handshake.query.secret === SECRET_ADMIN_TOKEN) {
    adminId = socket.handshake.query.adminId;
    await updateAdminGraph(socket, facultyId, facultyId, adminId);
    await updatePositionRequests(socket, facultyId, facultyId, adminId);
  } else {
    await updateScreening(socket, facultyId, facultyId);
  }

  redisClientFlow.on('message', async (queue, payloadFacultyId) => {
    await updateScreening(socket, facultyId, payloadFacultyId);
    await updateAdminGraph(socket, facultyId, payloadFacultyId, adminId);
  });

  redisClientFlow.subscribe('flow-flow');

  redisClientRequest.on('message', async (queue, payloadFacultyId) => {
    await updatePositionRequests(socket, facultyId, payloadFacultyId, adminId);
  });
  redisClientRequest.subscribe('flow-position-request');

  socket.on('disconnect', () => {
    redisClientFlow.removeAllListeners();
    redisClientRequest.removeAllListeners();
  });
};

module.exports = screening;
