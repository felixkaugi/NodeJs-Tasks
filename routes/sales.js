var express = require('express')
var router = express.Router()
var  bodyParser = require ('body-parser')
var mongoose = require('mongoose')
var {ensureAuthenticated} = require('../config/auth')
router.use( express.static( "public" ) );
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
var sales = require('../modules/sales')
router.get('/sales',ensureAuthenticated, (req,res)=>{
    res.render('pages/sales')
})

router.post('/sales',(req,res)=>{
    var receipt_no = req.body.receipt_no
    var cashier = req.body.cashier
    var customers_name = req.body.customers_name
    var discount = req.body.discount
    var price = req.body.price
    var date = req.body.date
    var product_name = req.body.product_name
    var newSaless = new sales({
        receipt_no: receipt_no,
        cashier: cashier,
        customers_name: customers_name,
        discount: discount,
        date: date,
        price: price,
        product_name: product_name
    })
    sales.createSales(newSaless, function(err,sale){
        if(err){
            res.send(err)
        }else{
            res.redirect('/report')
        }
    })
})
router.get('/report',(req,res)=>{
    sales.listSales(function(err,sale){
      if(err){
          res.send(err)
      }else{
          sales.compute(function(err, total){
              if(err){
                  res.send(err)
              }else{
                  res.render('pages/report', {message: sale, results: total })
                  
              }
          })
        // res.render('pages/report', {message: sale})
      }
    })
   
})
// router.get('/report', (req,res)=>{
//     sales.compute(function(err, total){
//         if(err){
//             res.send(err)
//         }else{
//             res.render('pages/report', {results: total})
//         }
//     })
// })

module.exports = router