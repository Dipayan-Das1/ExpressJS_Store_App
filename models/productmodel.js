const db_sequelize = require("../util/database");
const sequelize = require("sequelize");

const Product = db_sequelize.define('product',{
    id : {type: sequelize.INTEGER,autoIncrement: true,allowNull: false,primaryKey: true},
    title : {type: sequelize.STRING,allowNull: false},
    price : {type: sequelize.DOUBLE,allowNull: false},
    description : {type: sequelize.TEXT, allowNull: false},
    imageUrl: {type: sequelize.STRING,allowNull: false}
}); 

module.exports = Product;