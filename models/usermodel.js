const db = require('../util/database').getConnection
const ObjectId = require('mongodb').ObjectID;
const User = class User{
    constructor(name,email)
    {
        this.name = name;
        this.email = email;
    }

    createUser()
    {
        return db().collection("users").insertOne(this).then(res => {
            console.log("user successfully inserted "+res._id);
            return res;
        }).catch(err => {
            console.log("Exception during user creation");
            throw err;
        })
    }

    static getUser(id)
    {
        return db().collection("users").findOne({_id: new ObjectId(id)});
    }

    static getCart(userId)
    {
        return db().collection("users").aggregate([{$match: {_id: new ObjectId(userId)}},{$lookup: {from: "products",localField: "cart.productId",foreignField: "_id",as:"cartItems"}}]).next();
    }


    static addToCart(userId, productId)
    {
        let user; 
        return User.getUser(userId).then(res => {
            user = res;
            let cart = res.cart;
            if(!cart)
            {
                cart = []
            }
            return cart;
        }).then(cart => {
            
            let cartItem = cart.find(item => item.productId.toString() === productId);
            if(cartItem)
            {
                cartItem.quantity = cartItem.quantity + 1;
                return cart;  
            }
            else{
                cartItem = {productId:new ObjectId(productId),quantity: 1};    
                cart = [...cart,cartItem];
                return cart;
            }
            

        }).then(cart => {
             return db().collection("users").updateOne({_id: new ObjectId(userId)},{$set: {"cart":cart}});
        });
    }

    static deleteFromCart(userId,productId)
    {
        let user;
        return User.getUser(userId).then(res => {
            user = res;
            return res.cart;
        }).then(cart => {
            if(cart)
            {
                let cartItems = cart.filter(item => {
                    return item.productId.toString() != productId;
                });
                console.log("cartitems before delete "+cartItems)
                return db().collection("users").updateOne({_id: new ObjectId(userId)},{$set: {"cart":cartItems}});
            }
            return cart;
        });
    }

    static clearCart(userId)
    {
        return db().collection("users").updateOne({_id: new ObjectId(userId)},{$set: {"cart":[]}});
    }
}

module.exports = User;