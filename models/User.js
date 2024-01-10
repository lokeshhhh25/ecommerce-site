const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
// username or password by default lega passport.l.m package
//agar kuch additional lena h to le sakte hai
email:{
    type:String,
    trim:true,
    required:true
},
role:{
    type:String,
    required:true

},
cart:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
]


})

userSchema.plugin(passportLocalMongoose);        //yeh jruri hai use krne le liye

let User = mongoose.model('User', userSchema);
module.exports= User;
