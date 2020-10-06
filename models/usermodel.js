const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const User = db_sequelize.define('user',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    name : {type: sequelize.STRING,allowNull: false},
email : {type: sequelize.STRING,allowNull: false,unique: true}
}); 

module.exports = User;