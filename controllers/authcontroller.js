const User = require('../models/usermodel')
const bcrypt = require('bcryptjs'); 
module.exports.getlogin = (req,res,next) => {
    res.render('auth/login',{isAuthenticated:false,path:'/login',pageTitle:'Login Page'})
}

module.exports.login = (req,res,next) => {
    let email = req.body.email;
    let pwd = req.body.password;
    User.findOne({email:email}).then(usr => {
        if(usr)
        {
            bcrypt.compare(pwd,usr.password).then(match => {
                if(match)
                {
                    req.session.user = usr;
                    req.session.isLoggedin = true;
                    res.redirect('/');
                }
                else{
                    res.redirect('/login');        
                }
            }).catch(err => {
                console.log(err);
                res.redirect('/login');        
            });
        }
        else{
            res.redirect('/login');
        }
        
    }).catch(err => console.log(err));   
}

module.exports.logout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login');
      });
}

module.exports.signup = (req,res,next) => {
    res.render('auth/signup',{isAuthenticated:false,path:'/signup',pageTitle:'Signup Page'})
}

module.exports.signupuser = (req,res,next) => {
    const email = req.body.email;
    User.findOne({email:email}).then(usr => {
        if(usr)
        {
            console.log("User with same email already exists");
            res.render('auth/signup',{isAuthenticated:false,path:'/signup',pageTitle:'Signup Page'})
        }
        else
        {
            bcrypt.hash(req.body.password,12).then(pwd => {
                let user = new User({name: req.body.name,email: req.body.email,cart: {products:[]},password: pwd});
                user.save();
            })            
        }
    }).catch(err => {
        console.log(err);
    });
    res.redirect('/login');
}