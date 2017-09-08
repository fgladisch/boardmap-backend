const Sequelize = require('sequelize')
const pg = require('pg')

const dbConfig = require('../config/db')

const sequelize = new Sequelize('boardmap', dbConfig.username, dbConfig.password, { dialect: 'postgres' })

const Location = require('./location')(sequelize)

module.exports = { sequelize, Location }