const db = require("../util/database")
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
       return db.execute('INSERT INTO storedb.products (title, price, description,image_url) VALUES (?, ?, ?,?)',[this.title,this.price,this.description,'image']); 
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

    static getById(id)
    {
        console.log("Inside fetch by Id");
        return db.execute("select * from storedb.products where id = ?",[id]);   
    }

    static fetchAll(cb)
    {    
        console.log("Inside fetch all");
        return db.execute("select * from storedb.products")        
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