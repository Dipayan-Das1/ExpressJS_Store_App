const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const Order = db_sequelize.define('order',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    total : {type: sequelize.DOUBLE,allowNull: false}
}); 

module.exports = Order;