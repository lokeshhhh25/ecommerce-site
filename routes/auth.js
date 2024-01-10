const express = require('express');
const User = require('../models/User');
const { Passport } = require('passport');
const passport = require('passport');
const router = express.Router()

//to display signup page
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})


//actually want to register user in db
router.post('/register' ,async (req,res)=>{
try{
    let{email ,password ,username,role} = req.body;
    const user = new User({email,username,role});
    const newUser= await User.register(user ,password);
                 // res.send(newUser); //to check store hora hai ki nhi db me
                 // res.redirect('/login'); //to redirect on login page to login manually
                 //to login automatically after register new user
     req.login(newUser , function(err){
         if(err) {return next(err)}
         req.flash('success','welcome you are registered successfully')
         return res.redirect('/products');
      })
}
 catch(e){
    req.flash('error',e.message);

     return res.redirect('/signup');
    
}
})
   

//to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})


//to actually login via the db

router.post('/login',
           passport.authenticate('local',
             { failureRedirect: '/login', failureMessage: true 
             }),
    (req,res)=>{
        // console.log(req.user);   //to check user detail
      req.flash('success' , 'welcome back')
    res.redirect('/products');
    })

//logout
router.get("/logout",(req,res)=>{
   ()=>{
     req.logout();
   }
   req.flash('success' , ' good bye')
   res.redirect('/login');
   
});






module.exports = router;  