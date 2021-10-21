var express = require('express')
var session = require('express-session')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var bcrypt = require('bcrypt');
var {ensureAuthenticated} = require('../config/auth')
var passport = require('passport')
var Users = require('../modules/users')
var methodOverride = require('method-override')
require('../config/passport')(passport)
var router = express.Router()
var  bodyParser = require ('body-parser')
router.use( express.static( "public" ) );
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
router.use(methodOverride('_method'))
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    }));
    //passport middleware 
    router.use(passport.initialize());
    router.use(passport.session());
    //connect flash
    router.use(flash())
    //create a local variable to give different colors for errors
    router.use((req,res,next)=>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.errors_msg = req.flash('errors_msg');
        res.locals.error = req.flash('error');
        next();
    })
    router.get('/home',ensureAuthenticated,(req,res)=>{
        res.render('pages/home')
    })
    
//register get request
router.get('/register', (req,res)=>{
    res.render('pages/register')
})
//handle register
router.post('/register', (req,res)=>{
  //get form data
  var Username = req.body.Username;
  var Email = req.body.Email;
  var Password = req.body.Password;
  var Password2 = req.body.Password2;
  var errors = [];
  //validate data check for empty fields
  if(!Username || !Email || !Password || !Password2){
      errors.push({ msg: 'All Fields are Required'})
  }
  //check for password match
  if(Password != Password2){
      errors.push({ msg: 'Password do not match'})
  }
  //check for password length
  if(Password.length < 6){
      errors.push({ msg: 'Password too short should be atleast 6 characters '})
  }
  if(errors.length > 0){
      res.render('pages/register',{
          errors,
          Username,
          Email,
          Password,
          Password2
      })
  }else{
      //validation passed
      Users.findOne({Email: Email})
      .then(user =>{
          //check if user exist
          errors.push({ msg: 'Email is already taken'})
          if(user){
          res.render('pages/register',{
          errors,
          Username,
          Email,
          Password,
          Password2
      })
          }else{
            var newUser = new Users({
            Username: Username,
            Email: Email,
            Password: Password
        })
        //hash password
        bcrypt.genSalt(10, (err, salt)=> 
        bcrypt.hash(newUser.Password, salt,(err, hash)=>{
           if(err) throw err;
            //set password to hashed password
            newUser.Password = hash
            //save user to the database
            newUser.save()
            .then(user =>{
                req.flash('success_msg', 'You are now Registered You Can LogIn')
                res.redirect('/login')
            })
            .catch(err => console.log(err))
        }))
          }
      })
  }
})
//create a login in route
router.get('/login',(req,res)=>{
    res.render('pages/login')
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next)
})
router.get('/users',ensureAuthenticated, (req,res)=>{
    Users.getUsers(function(err,user){
        if(err){
            res.send(err)
        }else{
            res.render('pages/users',{message: user})
        }
    })
})
router.get('/users/:id',ensureAuthenticated, (req,res)=>{
    // var id = req.params.id
    res.send('view User' +req.params.id)
})
//route to edit user
router.get('/users/:id/edit',ensureAuthenticated, async (req,res)=>{
   try{
      var user = await Users.findById(req.params.id)
      res.render('pages/editUser', {message: user})
   }
   catch{
    res.redirect('pages/users')
   }
})
router.put('/users/:id', async (req,res)=>{
    var user 
    try{
        user = await Users.findById(req.params.id)
        user.Username = req.body.Username
        //console.log(req.body.Username)
        user.Email = req.body.Email
        await user.save()
        res.redirect('/users')
    }
    catch{
       if(user == null){
           res.redirect('pages/users')
       }
       else{
         res.render('pages/editUser',{
             message: user,
             errorMessage: 'failed to update the user'
         })
       }
    }
})
//route to delete user
router.delete('/users/:id', async (req,res)=>{
    var user 
    try{
        user = await Users.findById(req.params.id)
        user.Username = req.body.Username
        user.Email = req.body.Email
        await user.remove()
        res.redirect('/users')
    }
    catch{
       res.redirect(`users/${user.id}`)
    }
})
module.exports = router