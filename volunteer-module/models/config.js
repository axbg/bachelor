const Sequelize = require('sequelize');

const DB_HOST = require('../config').DB_HOST;
const DB_NAME = require('../config').DB_NAME;
const DB_USERNAME = require('../config').DB_USERNAME;
const DB_PASSWORD = require('../config').DB_PASSWORD;

const database = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  collate: 'utf8_unicode_ci',
  logging: false,
  define: {
    underscored: true,
    timestamps: false,
  },
});

module.exports = database;
