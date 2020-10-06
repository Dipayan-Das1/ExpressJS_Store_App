//import mysql2
const Sequelize = require('sequelize');

const sequelize = new Sequelize('storedb','STORE_USR','STORE_USR_PWD',{host:'localhost',dialect:'mysql'});

module.exports = sequelize;
