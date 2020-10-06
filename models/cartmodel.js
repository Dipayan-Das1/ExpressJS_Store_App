const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const Cart = db_sequelize.define('cart',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
}); 

module.exports = Cart;