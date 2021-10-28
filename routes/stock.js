var express = require('express')
var router = express.Router()
var  bodyParser = require ('body-parser')
var mongoose = require('mongoose')
var Stock = require('../modules/addStock')
var {ensureAuthenticated} = require('../config/auth')
router.use( express.static( "public" ) );
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
router.get('/add_stock',ensureAuthenticated, (req,res)=>{
    res.render('pages/addStock')
})
router.post('/add_stock',(req,res)=>{
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
router.get('/list_products',ensureAuthenticated, (req,res)=>{
    Stock.getStock(function(err, product){
        if(err){
            res.send(err)
        }else{
            res.render('pages/listProducts', {message: product})
        }
    })
})

module.exports = router