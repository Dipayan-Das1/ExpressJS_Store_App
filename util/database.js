//import mysql2
const dbMySql = require("mysql2");

const pool = dbMySql.createPool({
    host:"localhost",
    user:"STORE_USR",
    password:"STORE_USR_PWD",
    database:"storedb"
});

module.exports = pool.promise();
