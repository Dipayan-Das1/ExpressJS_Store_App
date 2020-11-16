const db = require('../util/database').getConnection;
const ObjectId = require('mongodb').ObjectID;

const Order = class Order {

    constructor(items,price,user)
    {
        this.items = items;
        this.price = price;
        this.user = new ObjectId(user);
    }

    save()
    {
        return db().collection("orders").insertOne(this);
    }

    static getOrder(userId)
    {
        return db().collection("orders").find({user: new ObjectId(userId)}).toArray();
    }
}


module.exports = Order;