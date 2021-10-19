var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcryptjs')
var mongoose = require('mongoose')
//load use module
var User = require('../modules/users')
module.exports =function(passport){
    passport.use(
        
        new LocalStrategy({
            usernameField: 'Email',
            passwordField: 'Password'
        }, (Email,Password,done)=>{
            
            //match users
            User.findOne({Email: Email})
            .then(user=>{
                if(!user){
                    return done(null, false, {message: 'User does not Match'})
                }
                //match password
                bcrypt.compare(Password, user.Password, (err, isMatched)=>{
                   if(err)throw err;

                   if(isMatched){
                       return done(null, user)
                   }else{
                       return done(null, false, {message: 'Password Invalid '})
                   }

                })
            })
            .catch(err =>console.log(err))
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
}