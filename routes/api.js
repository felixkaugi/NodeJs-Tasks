var express = require('express')
var router = express.Router();
var User = require('../modules/user')
var mongoose = require('mongoose')
var db = 'mongodb://localhost:27017/users'
mongoose.connect(db, function(err, db){
    if(err) throw err;
    console.log('connected...!')
});
router.get('/', (req,res)=>{
    res.render('../pages/login')
})
//create a post route
router.post('/login', (req,res)=>{
    User.find({"Email": req.body.Email})
    .then(
        results =>{
           console.log(results.length)
           if(results.length !==0){
               res.json({
                   message: 'User already exist',
                   status: false
               })
           }
        }
    )
})