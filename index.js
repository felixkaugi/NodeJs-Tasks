var express = require('express')
// var express = require ('express')
//var fetch = require ('node-fetch')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var app = express()

var mongoose = require('mongoose')
// import Prod from './modules/addProducts'
var Prod = require('./modules/addProducts')
var {ensureAuthenticated} = require('./config/auth')
//module for stock

// var prod = require('./modules/addProducts')
//importing the sales modules

var  bodyParser = require ('body-parser')
app.use('/', require('./routes/user'))
app.use('/', require('./routes/inventory'))
app.use('/',require('./routes/sales'))
app.use('/',require('./routes/stock'))
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(methodOverride('_method'))
//express session middleware 
app.use(cookieParser());
//set the view engine on ejs engine
app.set('view engine', 'ejs')
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

//end of the code to perform crud operation 


//route to list all the products
//creating a route to list products

//create a route to add stock

//create a route to the report

//create server
var PORT = process.env.PORT || 7071
app.listen(7071, console.log(`server running at port ${PORT}`))
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

