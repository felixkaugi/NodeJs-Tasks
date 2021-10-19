var express = require('express')
// var express = require ('express')
//var fetch = require ('node-fetch')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var bcrypt = require('bcrypt');
var passport = require('passport')
var methodOverride = require('method-override')
var app = express()
require('./config/passport')(passport)
var mongoose = require('mongoose')
var Users = require('./modules/users')
// import Prod from './modules/addProducts'
var Prod = require('./modules/addProducts')
var {ensureAuthenticated} = require('./config/auth')
//module for stock
var Stock = require('./modules/addStock')
// var prod = require('./modules/addProducts')
//importing the sales modules
var sales = require('./modules/sales')
var  bodyParser = require ('body-parser')
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(methodOverride('_method'))
//express session middleware 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  }));
  //passport middleware 
  app.use(passport.initialize());
  app.use(passport.session());
  //connect flash
  app.use(flash())
  //create a local variable to give different colors for errors
  app.use((req,res,next)=>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.errors_msg = req.flash('errors_msg');
      res.locals.error = req.flash('error');
      next();
  })
app.use(cookieParser());
//set the view engine on ejs engine
app.set('view engine', 'ejs')
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
//the shop management system sta
//create a route to the home page 
app.get('/home',ensureAuthenticated,(req,res)=>{
    res.render('pages/home')
})
//register get request
app.get('/register', (req,res)=>{
    res.render('pages/register')
})
//handle register
app.post('/register', (req,res)=>{
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
app.get('/login',(req,res)=>{
    res.render('pages/login')
})
app.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next)
})
 app.get('/inventory', (req,res)=>{
     Stock.getStock(function(err, product){
         if(err){
             res.send(err)
         }else{
             res.render('pages/inventory', {message: product})
         }
     })
 })
//route to edit inventory products
app.get('/inventory/:id', (req,res)=>{
    res.send(req.params.id)
})
app.get('/inventory/:id/edit', async (req,res)=>{
    try{
      var product =await Stock.findById(req.params.id)
      res.render('pages/editInventory', {message: product })
    }
    catch{
       res.redirect('/inventory')
    }
})
//create a put route to hundle product edit
app.put('/inventory/:id',async  (req,res)=>{
    var product
    try{
       product = await Stock.findById(req.params.id)
       product.product_name = req.body.product_name
       product.price = req.body.price
       product.stock = req.body.stock
       await product.save()
       res.redirect('/inventory')
    }
    catch{
       if(product == null){
           res.send('null products')
       }else{
        res.render('pages/editInventory',{
            message: product,
            errorMessage: 'failed to update the inventory'
        })
       }
    }
})
//create a delete route
app.delete('/inventory/:id',async (req,res)=>{
    var prods
    try{
        prods = await Stock.findById(req.params.id)
        prods.product_name = req.body.product_name
        prods.price = req.body.price
        prods.stocks = req.body.stocks
        await prods.remove()
        res.redirect('/inventory')
    }
    catch{
        res.redirect('/inventory')
    }
})
//create route to update users using findOneAndUpdate function
//route to update users
// })
// app.get('/users/:id/edit', (req,res)=>{
//     var Username = req.body.Username
//     var Email = req.body.Email
//     Users.updateUser(Username, Email, function(err, user){
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.render('pages/editUser', {message: user})
//         }
//     })
// })
// app.put('/users/:id', (req,res)=>{
//     var Username = req.body.Username
//     var Email = req.body.Email
//      Users.updateUser(Username, Email, function(err, user){
//          if(err){
//              res.send(err)
//          }
//          else{
//             res.redirect('/users')
//          }
//      })
// })
//use the bellow code to perform crude operation 
// 
app.get('/users',ensureAuthenticated, (req,res)=>{
    Users.getUsers(function(err,user){
        if(err){
            res.send(err)
        }else{
            res.render('pages/users',{message: user})
        }
    })
})
app.get('/users/:id',ensureAuthenticated, (req,res)=>{
    // var id = req.params.id
    res.send('view User' +req.params.id)
})
//route to edit user
app.get('/users/:id/edit',ensureAuthenticated, async (req,res)=>{
   try{
      var user = await Users.findById(req.params.id)
      res.render('pages/editUser', {message: user})
   }
   catch{
    res.redirect('pages/users')
   }
})
app.put('/users/:id', async (req,res)=>{
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
app.delete('/users/:id',ensureAuthenticated, async (req,res)=>{
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
//end of the code to perform crud operation 

app.get('/sales',ensureAuthenticated, (req,res)=>{
    res.render('pages/sales')
})

app.post('/sales',ensureAuthenticated,(req,res)=>{
    var receipt_no = req.body.receipt_no
    var cashier = req.body.cashier
    var customers_name = req.body.customers_name
    var discount = req.body.discount
    var value = req.body.value
    var date = req.body.date
    var newSaless = new sales({
        receipt_no: receipt_no,
        cashier: cashier,
        customers_name: customers_name,
        discount: discount,
        date: date,
        value:value
    })
    sales.createSales(newSaless, function(err,sale){
        if(err){
            res.send(err)
        }else{
            res.redirect('/report')
        }
    })
})
//route to list all the products
//creating a route to list products
app.get('/list_products',ensureAuthenticated, (req,res)=>{
    Stock.getStock(function(err, product){
        if(err){
            res.send(err)
        }else{
            res.render('pages/listProducts', {message: product})
        }
    })
})
//create a route to add stock
app.get('/add_stock',ensureAuthenticated, (req,res)=>{
    res.render('pages/addStock')
})
app.post('/add_stock',(req,res)=>{
    var barcode = req.body.barcode
    var product_name = req.body.product_name
    var price = req.body.price
    var stocks = req.body.stocks
    var units = req.body.units
     var newStocks = new Stock({
         barcode: barcode,
         product_name: product_name,
         price: price,
         stocks: stocks,
         units: units
     })
     Stock.createNewStock(newStocks, function(err,stock){
         if(err){
             res.send(err)
         }else{
             res.redirect('/list_products')
         }
     }) 
})
//create a route to the report
app.get('/report',ensureAuthenticated,(req,res)=>{
    sales.listSales(function(err,sale){
      if(err){
          res.send(err)
      }else{
        res.render('pages/report', {message: sale})
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

