const axios = require('axios');
const VOLUNTEER_NOTIFICATION_ADDRESS = require('../config').VOLUNTEER_NOTIFICATION_ADDRESS;

module.exports.sendNotification = (authorization, userId) => {
  const payload = {
    userId: userId,
  };

  const headers = {
    'Authorization': authorization,
  };

  axios.post(VOLUNTEER_NOTIFICATION_ADDRESS, { ...payload }, { headers: headers });
};
