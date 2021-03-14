const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let connection; 

let url = "mongodb://localhost:27017/storedb";
let usr;

const mongoConnect = () => { return mongoClient.connect(url).then(client => {
    connection = client.db("storedb");
    return connection;
}).then(
    conn => {
        conn.collection("users").findOne({name:"admin"}).then(user => {
         if(user)
         {
             usr = user._id;
             return user;

         }   
         else{
             console.log("Create admin user");
            return conn.collection("users").insertOne({name:"admin",email:"admin@admin.com"}).then(res =>{
                usr = res.insertedId;
            });
         }
        }).then(res => {
            
            console.log("Set user to "+usr)
            return usr;
        }).then(res => {
            connection.createCollection("products").then(res => {
                console.log("products db created");
            }).catch(err =>{
                
            });
            return res;
        }).then(res => {
                    connection.createCollection("orders").then(res => {
                    console.log("orders db created");
                }).catch(err =>{
                    
                });
                return res;
            })
            
    }
)};

const getUser = () => usr;
const getConnection = () => connection;

module.exports.mongoConnect = mongoConnect;
module.exports.getConnection = getConnection; 
module.exports.getUser = getUser;
