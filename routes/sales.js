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
router.get('/report',ensureAuthenticated,(req,res)=>{
    sales.listSales(function(err,sale){
      if(err){
          res.send(err)
      }else{
        res.render('pages/report', {message: sale})
      }
    })
})
module.exports = router