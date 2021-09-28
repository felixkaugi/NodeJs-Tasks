var mongoose = require('mongoose')
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/Userauth')
var db = mongoose.connect
//user schema
var Userschema = mongoose.Schema({
    Username: {
        type: String
        // required: true,
        // minlength: 5,
        // maxlength: 50
    },
    Email: {
        type: String
        // required: true,
        // minlength: 5,
        // maxlength: 255,
        // unique: true
    },
    Password: {
        type: String
        // required: true,
        // minlength: 5,
        // maxlength: 255
    }
})
 

//authenticate user deatils
Userschema.static.authenticate = function(Email, Password, callback){
    console.log(Email)
    console.log(Password)
    User.findOne({Email: Email,Password: Password})
    .exec(function(err, user){
        if(err){
            return callback(err)
        }else if(!user){
           var err = new Error('User not found')
           err.status = 404;
           return callback(err)
        }
        
    })
}
var User = module.exports = mongoose.model('User', Userschema)
module.exports.createUser = function(newUser, callback){
    newUser.save(callback)
}
module.exports.authenticate = function(Email,Password, callback){
    Email.find()
}
