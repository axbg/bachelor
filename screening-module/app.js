const express = require('express');
const PORT = require("./config").PORT;
const redis = require('redis');
const REDIS_ADDRESS = require('./config/index').REDIS_ADDRESS;
const REDIS_PORT = require('./config/index').REDIS_PORT;
const SECRET_ADMIN_TOKEN = require('./config/index').SECRET_ADMIN_TOKEN;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const groupArray = require('group-array');

const User = require('./models/index').User;
const PositionRequest = require('./models/index').PositionRequest;
const Flow = require('./models/index').Flow;
const Position = require('./models/index').Position;

const redisClientFlow = redis.createClient(REDIS_PORT, REDIS_ADDRESS);
const redisClientRequest = redis.createClient(REDIS_PORT, REDIS_ADDRESS);
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const millisToMinutesAndSeconds = function (millis) {
	let minutes = Math.floor(millis / 60000);
	let seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const updateScreening = async (socket, facultyId, payloadFacultyId) => {
	if (facultyId === payloadFacultyId) {
		const flows = await Flow.findAll({ where: { facultyId: facultyId }, raw: true });
		const currentOrderNumber = flows.reduce((total, flow) => total + flow.flow, 0);
		let avgTimePerStudent = 0;

		if (flows.length > 1 && currentOrderNumber !== 0) {
			let diff = [];

			for (let i = 0; i < flows.length - 1; i++) {
				diff.push(parseInt(flows[i + 1].time) - parseInt(flows[i].time));
			}

			avgTimePerStudent = millisToMinutesAndSeconds(diff.reduce((total, time) => total + time, 0) / currentOrderNumber);
		}

		socket.emit(facultyId, { currentOrderNumber: currentOrderNumber, averageTimePerStudent: avgTimePerStudent });
	}
}

const updateAdminGraph = async (socket, facultyId, payloadFacultyId, adminId) => {
	if (facultyId === payloadFacultyId && adminId) {
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		const currentDayFlows = await Flow.findAll({
			where: { facultyId: facultyId, date: { [Op.gt]: currentDay } },
			attributes: ['flow', 'date'],
			raw: true
		});

		const groupedFormattedDayFlows = groupArray(currentDayFlows.map(flow => { return { flow: flow.flow, hour: flow.date.getHours() } }), 'hour');

		const graphData = Object.keys(groupedFormattedDayFlows).map((key, index) => {
			const total = groupedFormattedDayFlows[key].reduce((total, flow) => total + flow.flow, 0);
			return { [key]: total };
		});

		socket.emit('flow-admin-data', graphData);
	}
}

const updatePositionRequests = async (socket, facultyId, payloadFacultyId, adminId) => {
	if (adminId && facultyId === payloadFacultyId) {
		const positionRequests = await PositionRequest.findAll({
			where: { read: false },
			include: [{ model: User, attributes: ['username'], where: { facultyId: facultyId }, include: [{ model: Position }] },
			{ model: Position }],
			raw: true
		});
		socket.emit('flow-position-request', { positionRequests: positionRequests });
	}
}

io.on('connection', async (socket) => {
	let adminId;
	let facultyId = socket.handshake.query.facultyId;

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
	})
});

server.listen(PORT, () => {
	console.log("flow - screening module");
})