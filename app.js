const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodoverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/User');






const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-sam-app')
.then(()=>{console.log("DB connected");})
.catch((err)=>{
    console.log("not connected please connect"); 
    console.log(err);
})


let configSession={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly:true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge:24*7*60*60*1000
        // secure: true
     }
  }

app.engine('ejs' ,ejsMate);
app.set('view engine','ejs');
//view folder
app.set('views',path.join(__dirname,'views'))
//public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'));
app.use(session(configSession));


app.use(flash());

//passport

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser= req.user;
    res.locals.success= req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//seeding database ek baar kardiya bar bar nhi karna to comment kardo ek baar run krke
// seedDB();


//passport
passport.use(new LocalStrategy(User.authenticate()));


 
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);









app.listen(8080, ()=>{
    console.log("server connected to 8080 port successfully");
})