const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const OrderItem = db_sequelize.define('orderItem',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    quantity : {type: sequelize.INTEGER,allowNull: false},
    price : {type: sequelize.DOUBLE,allowNull: false}
}); 

module.exports = OrderItem;