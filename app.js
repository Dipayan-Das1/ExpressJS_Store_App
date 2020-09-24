const serverInit = require('http');
//import express framework
const express = require('express');
//import body parser dependency 
const parser = require('body-parser');

//import admin routes
const manageProducts = require('./routes/manage-products');
//import shop routes
const shopProducts = require('./routes/shop-products');

const path = require('path');

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

/*
parser.urlencoded() registers a middleware function similar to app.use we are using below , parsing the incoming request for all paths
this parses only html forms not other types
*/

//manageproducts is express router ....manages resources starting with /manage
app.use('/manage',manageProducts.router);

//for routing requests to '/'
app.use(shopProducts);

//set 404 
app.use((req,res,next) => {
    //using html files
    //res.status(404).sendFile(path.join(__dirname,"views","NotFound,html"));

    //using templating
    res.status(404).render('NotFound',{pageTitle:'Resource does not exist',path:'NotFound'});
});

//create http server and add express app as event callback
const httpServer = serverInit.createServer(app);

//configure server
httpServer.listen(8002);