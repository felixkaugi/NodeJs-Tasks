var express = require('express')
// var express = require ('express')
//var fetch = require ('node-fetch')
var app = express()
var mongoose = require('mongoose') 
var Users = require('./modules/users')
// var passportLocalMongoose = require('passport-local-mongoose')
// //importing modules
// var { User, validate } = require('./modules/user');
//var schema = require('./database/conn')
var  bodyParser = require ('body-parser')
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect('mongodb://localhost:27017/userDb')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
//set the view engine on ejs engine
app.set('view engine', 'ejs')
app.use(require("express-session")({
    secret: "trial",
    resave: false,
    saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session())
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//create server


var server =  app.listen(7071, ()=>{

    //create a route
    app.get('/students/list', (req,res)=>{
        var data = [{
            Name: 'Kaugi',
            RegNo: 'EDS1',
            Coures: 'Computer Science',
            Units:{
                COSC100: 'Object Oriented Programming',
                COSC101: 'Fundamentals of Programming',
                COSC103: 'Database management',
                COSC104: 'Digital Electronics'
            }
        },{
            Name: 'Ian',
            RegNo: 'ED2',
            Coures: 'Criminology',
            Units:{
                CBB01: 'Human Rights',
                CBB02: 'Internatinal Law',
                CBC03: 'Zoology',
                COSC04: 'Philosophy'
            }
        }
    ]
        res.json(data)
        for(var i = 0; i < data.length; i++){
            console.log(data[i].Name)
        }
    })
    //creating an array with product, price, Discount and manfactures details
    //create a route
    app.get('/products/list', (req,res)=>{   
        var product =[{
            Product_Name: 'Sumsung Phone',
            Price: 10000,
            Discount: '5%',
            Manfactures_details:{
                Name: 'Samsung Electronics',
                Location: 'Tatu City'
            }
        },{
            Product_Name: 'Neon',
            Price: 4999,
            iscount: '3%',
            Manfactures_details:{
                Name:'Neon Smart Phones',
                Location: 'Garden City Nairobi'
            }
        }]
        res.json(product)
        for(var i = 0; i < product.length; i++){
            console.log(product[i].Product_Name)
        }
    })
    //creating route date
    app.get('/date',(req,res)=>{
        var dt =  Date();
        res.send(dt)
        
    })
    //creating route even
   app.get('/even',(req,res)=>{
       //create a dynamic array
       var arr =[];
       for(var i = 1000; i <= 10000; i++){
           if(i % 2 ==0){
               arr.push(i)
           }
       }
       res.json(arr)
   })

   app.get('/weather',(req,res)=>{
       fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-1.2824763&lon=36.8148693&appid=c2447ee0d5d8e95d70f2c54fc316302c')
       .then((res)=> res.json())
       //.then(json => res.send(json))
       .then(function(result) {
        //res.send(result.current)
             
        res.render('pages/index',{

            result: result
    
        })
       })
   })
  app.get('/weather/app', (req,res)=>{


        //fetching the API
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-1.2824763&lon=36.8148693&appid=c2447ee0d5d8e95d70f2c54fc316302c')
      .then((res)=> res.json())
      .then( function(result){
       //result - 273.15 + '℃';
          res.render('pages/index',{
              result: result,
              formatDate: formatDate
              
          })
      })
  })

//  //route showing home page
// app.get('/', (req,res)=>{
//     res.render('pages/home')
//    })
// //route showing register form
// app.get('/login', (req,res)=>{
//     res.render('pages/login')
//    })
// //handle user registaring
//  app.post('/login', (req,res)=>{
//     var Username = req.body.Username
//     var Email = req.body.Email
//     var Password = req.body.Password
//     myschema.register(new myschema({Username: Username})),
//     Password, (err, user)=>{
//         if(err){
//             console.log(err)
//             return res.render('pages/login')
//         }
//       passport.authenticate(local)(req,res, function(){
//           res.render('pages/dashboard')
//       })
//     }
//   })
//   //showing user login
//   app.get('/login', (req,res)=>{
//       res.render('pages/login')
//   })
//   //handling user login
//   app.post("/login", passport.authenticate("local", {
//     successRedirect: "pages/dashboard",
//     failureRedirect: "pages/login"
//    }), function (req, res) {
//    });
//    //
//register get request
app.get('/register', (req,res)=>{
    res.render('pages/register')
})
app.post('/register',(req,res)=>{
    var Username = req.body.Username
    var Email = req.body.Email
    var Password = req.body.Password;
    // req.checkBody('Username', 'Username required').notEmpty()
    // req.checkBody('Email', 'Not a valid username').isEmail();
    // req.checkBody('Username', 'Username Required').notEmpty();
    // req.checkBody('Password', 'password Required').notEmpty();
    // var errors = req.validationErrors();
      if(Username == null || Username == undefined){
          res.send('Error username required')
      }
      else if(Email == null || Email == undefined){
         res.send('error Emaile Required')
      }
      else if(Password == null || Password == undefined){
          res.send('error Password Required')
      }else{
        var newUser = new Users({
            Username: Username,
            Email: Email,
            Password: Password
        })
        Users.createUser(newUser, function(err,user){
            if(err) throw err;
            // console.log(user)
            res.send('Record Created')
        })
      }
 
})
//create a login in route
app.get('/login',(req,res)=>{
    res.render('pages/login')
})
//creat a login post route
app.post('/login', (req,res)=>{
    var Email = req.body.Email
    var Password = req.body.Password

    //console.log(Email)
     Users.authenticate(Email,Password,function(err, user){
        if(err){
            res.send('user not found')
        }else{
            console.log("Welcome  "+user.Email)
            res.send("Welcome  "+user.Email)
          
        }
     })
})
  
})
// function formatDate(date){

//     return new Date(date);
//     var humanReadable = new Date()
// return humanReadable.setUTCSeconds(date)

// // }
// function formatDate(date){
//     var humanReadable = new Date(0)
//     humanReadable.setUTCSeconds(date)
//     return humanReadable.toLocaleDateString("en", {weekday: 'short'})
// }

