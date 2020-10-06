const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const CartItem = db_sequelize.define('cartItem',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    quantity : {type: sequelize.INTEGER,allowNull: false}
}); 

module.exports = CartItem;