const serverInit = require('http');
//import express framework
const express = require('express');
//import body parser dependency 
const parser = require('body-parser');



//import admin routes
const manageProductsRoutes = require('./routes/manage-products');
//import shop routes
const shopProductsRoutes = require('./routes/shop-products');

const authRoutes = require('./routes/auth')

const path = require('path');

//import mongoose
const mongoose = require('mongoose');

const session = require('express-session');

const MongoDbStore = require('connect-mongodb-session')(session);


const store  = new MongoDbStore({
    uri:'mongodb://localhost:27017/store',
    collection:'sessions'
});


//Creates an Express application. 
const app = express();

//use ejs templating view engine
app.set('view engine','ejs');
app.set('views','views');


//server static files instead of going through middleware
//static content is in /public directory
app.use('/public',express.static(path.join(__dirname,"public")))

//for all incoming requests use parser to parse the incoming request
//this handler should come first
app.use('/',parser.urlencoded({extended: false}));

app.use(session({secret: 'secret123',resave:false,saveUninitialized:false,store:store}))

app.use('/',(req,res,next) => {

    if(req.session.user)
    {
        console.log("Logged in user "+req.session.user._id)
        User.findOne({_id:req.session.user._id}).then(usr => {
            req.user = usr;
            console.log("Logged in user "+req.user._id);
            next();
        })
    }
    else{
        console.log("No user data");
        next();
    }
    
    
});

/*
parser.urlencoded() registers a middleware function similar to app.use we are using below , parsing the incoming request for all paths
this parses only html forms not other types
*/

//manageproductsRoutes is express router ....manages resources starting with /manage
app.use('/manage',manageProductsRoutes.router);

app.use(authRoutes);
//for routing requests to '/'
app.use(shopProductsRoutes);

//set 404 
app.use((req,res,next) => {
    //using html files
    //res.status(404).sendFile(path.join(__dirname,"views","NotFound,html"));

    //using templating
    res.status(404).render('NotFound',{pageTitle:'Resource does not exist',path:'NotFound'});
});


const User = require('./models/usermodel')

mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true}).then(res => {
    User.findOne({name:"Admin"}).then(res => {
        if(!res)
        {
            const user = new User({
                name:"Admin",
                email:"Admin@gmail.com",
                cart: {products:[]}
            });
            user.save();
        }
    });
    

    app.listen(8002);
});

//create http server and add express app as event callback
const httpServer = serverInit.createServer(app);

//configure server


