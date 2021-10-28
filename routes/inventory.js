var express = require('express')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var router = express.Router()
var  bodyParser = require ('body-parser')
var Stock = require('../modules/addStock')
router.use( express.static( "public" ) );
var {ensureAuthenticated} = require('../config/auth')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
router.use(methodOverride('_method'))
router.get('/inventory',ensureAuthenticated, (req,res)=>{
    Stock.getStock(function(err, product){
        if(err){
            res.send(err)
        }else{
            Stock.stockWorth(function(err, totalSum){
                if(err){
                    res.send(err)
                }else{
                    // console.log(totalSum)
                    res.render('pages/inventory', {message: product, results: totalSum})
                }
            })
            // res.render('pages/inventory', {message: product})
        }
    })
})
router.get('/pro_join', (req,res)=>{
    Stock.innReport(function(err, innv){
        if(err){
            res.send(err)
        }else{
            res.render('pages/join', {message: innv})
        }
    })
})
//route to edit inventory products
router.get('/inventory/:id', (req,res)=>{
   res.send(req.params.id)
})
router.get('/inventory/:id/edit', async (req,res)=>{
   try{
     var product =await Stock.findById(req.params.id)
     res.render('pages/editInventory', {message: product })
   }
   catch{
      res.redirect('/inventory')
   }
})
//create a put route to hundle product edit
router.put('/inventory/:id',async  (req,res)=>{
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
router.delete('/inventory/:id',async (req,res)=>{
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
module.exports = router