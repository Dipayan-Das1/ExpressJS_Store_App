const getConnection = require('../util/database').getConnection;
const ObjectId = require('mongodb').ObjectID;
const Product = class Product{
    constructor(title,price,description,userId,id)
    {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = "image";
        this.createdBy = new ObjectId(userId);
        this.id = id ? new ObjectId(id) : null;
    }

    save()
    {
        return getConnection().collection("products").insertOne(this);
    }

    update()
    {
        console.log("update for id "+this.id)
        return getConnection().collection("products").updateOne({_id: this.id},{$set: this})
    }

    static delete(productId)
    {

        return getConnection().collection("products").deleteOne({_id: new ObjectId(productId)});
    }

    static getById(id)
    {
        return getConnection().collection("products").findOne({_id: new ObjectId(id)});
    }

    static findAll()
    {
        let conn = getConnection();
        return getConnection().collection("products").find({}).toArray();
    }

    static findAllByUser(userId)
    {
        let conn = getConnection();
        return getConnection().collection("products").find({createdBy: new ObjectId(userId)}).toArray();
    }
}

module.exports = Product;