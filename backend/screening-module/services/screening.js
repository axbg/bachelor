const groupArray = require('group-array');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const User = require('../models').User;
const PositionRequest = require('../models').PositionRequest;
const Flow = require('../models').Flow;
const Position = require('../models').Position;

const millisToMinutesAndSeconds = function(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const updateScreening = async (socket, facultyId, payloadFacultyId) => {
  if (facultyId === payloadFacultyId) {
    const flows = await Flow.findAll({ where: { facultyId: facultyId }, raw: true });
    const currentOrderNumber = flows.reduce((total, flow) => total + flow.flow, 0);
    let avgTimePerStudent = 0;

    if (flows.length > 1 && currentOrderNumber !== 0) {
      const diff = [];

      for (let i = 0; i < flows.length - 1; i++) {
        diff.push(parseInt(flows[i + 1].time) - parseInt(flows[i].time));
      }

      avgTimePerStudent = millisToMinutesAndSeconds(diff.reduce((total, time) => total + time, 0) / currentOrderNumber);
    }

    socket.emit(facultyId, { currentOrderNumber: currentOrderNumber, averageTimePerStudent: avgTimePerStudent });
  }
};

const updateAdminGraph = async (socket, facultyId, payloadFacultyId, adminId) => {
  if (facultyId === payloadFacultyId && adminId) {
    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);

    const currentDayFlows = await Flow.findAll({
      where: { facultyId: facultyId, date: { [Op.gt]: currentDay } },
      attributes: ['flow', 'date'],
      raw: true,
    });

    const groupedFormattedDayFlows = groupArray(currentDayFlows.map((flow) => {
      return { flow: flow.flow, hour: flow.date.getHours() };
    }), 'hour');

    const graphData = Object.keys(groupedFormattedDayFlows).map((key, index) => {
      const total = groupedFormattedDayFlows[key].reduce((total, flow) => total + flow.flow, 0);
      return { [key]: total };
    });

    socket.emit('flow-admin-data', graphData);
  }
};

const updatePositionRequests = async (socket, facultyId, payloadFacultyId, adminId) => {
  if (adminId && facultyId === payloadFacultyId) {
    const positionRequests = await PositionRequest.findAll({
      where: { read: false },
      include: [
        {
          model: User, attributes: ['username'],
          where: { facultyId: facultyId }, include: [{ model: Position }],
        },
        { model: Position }],
      raw: true,
    });
    socket.emit('flow-position-request', { positionRequests: positionRequests });
  }
};


module.exports = {
  updateScreening,
  updateAdminGraph,
  updatePositionRequests,
};
