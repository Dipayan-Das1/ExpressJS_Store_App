const express_app = require('../app');
const path = require('path');
const fs = require('fs');
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


/*move saving objects to a file
//temporarily store data here
//const products = [];
*/
//this module exports product model, we are defining a Product class here
//constructor is object constructor
module.exports = class Product {
    constructor(id,title,price,description)
    {     
        this.id = id;   
        this.title = title;
        this.price = price;
        this.description = description;
    }

    //object method
    save()
    {
        //products.push(this);
        //this.id = Math.random().toString();
        if(this.id === null)
        {
            this.id = getRndInteger(1, 100000);
        }
        //construct path to file storage
        const pth = path.join(path.dirname(require.main.filename),'data','products.json');

        //read exisitng contents
        fs.readFile(pth,(err,data) => {
            let products = [];
            if (!err)
            {
                //if no error parse the file conents to JSON
                products = JSON.parse(data);
            }
            else{
                console.log(err);
            }

            //add new product to product list and write to file
            
            products.push(this);
            fs.writeFile(pth,JSON.stringify(products),(err) => {
                console.log(err);
            });
            
        });
    }

    update()
    {
        //products.push(this);
        //this.id = Math.random().toString();
        
        //construct path to file storage
        const pth = path.join(path.dirname(require.main.filename),'data','products.json');

        //read exisitng contents
        fs.readFile(pth,(err,data) => {
            let products = [];
            if (!err)
            {
                //if no error parse the file conents to JSON
                products = JSON.parse(data);
                console.log("Id "+this.id)
                let prodIndex = products.findIndex(prod => prod.id === this.id);
                console.log("prodindex" + prodIndex);
                if(prodIndex >= 0)
                {
                    products[prodIndex] = this;
                    fs.writeFile(pth,JSON.stringify(products),(err) => {
                        console.log(err);
                    });
                }
            }
            else{
                console.log(err);
            }

            
            
           
            
        });
    }

    static getById(id,cb)
    {
        console.log("Inside fetch by Id");
        const pth = path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(pth,(err,content) => {
            console.log("Inside read file get By Id")
            let products = [];
            if (!err)
            {
                
                products = JSON.parse(content.toString());
                const product = products.find(p => p.id === parseInt(id));
                console.log(product);
                cb(product);
            }
            else{
                console.log(err);
            }
            
        });   
    }

    static fetchAll(cb)
    {    
        console.log("Inside fetch all");
        const pth = path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(pth,(err,content) => {
            console.log("Inside read file")
            let products = [];
            if (!err)
            {
                console.log("content"+content);
                products = JSON.parse(content.toString());
                console.log(products);
            }
            else{
                console.log(err);
            }
            cb(products);
        });   
    }

    static delete(productId)
    {    
        console.log("Inside delete "+productId);
        const pth = path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(pth,(err,content) => {
            console.log("Inside read file")
            let products = [];
            if (!err)
            {
                products = JSON.parse(content.toString());
                products = products.filter(p => p.id != parseInt(productId));
                
                fs.writeFile(pth,JSON.stringify(products),(err) => {
                    console.log(err);
                });
            }
            else{
                console.log(err);
            }
            
        });   
    }
}