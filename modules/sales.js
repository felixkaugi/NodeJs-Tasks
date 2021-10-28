var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Userauth')
//create sales schema
var salesSchema = mongoose.Schema({
    receipt_no: {
        type: Number
    },
    cashier:{
        type: String
    },
    customers_name:{
        type: String
    },
    discount:{
        type: String
    },
    date:{
        type: String,
        default: (new Date()).getTime()
    },
    price:{
        type: String
    },
    product_name:{
        type: String
    }
})
var sales = module.exports = mongoose.model('sales', salesSchema)
//module to create a new sales record
module.exports.createSales = function(newSale, callback){
    newSale.save(callback)
}
//module to list all the sales records
module.exports.listSales = function(callback){
    sales.find({}).exec(function(err,sale){
         if(err){
             return callback(err)
         }else{
             return callback(err, sale)
         }
    })
    
}
module.exports.compute = function(callback){
    sales.aggregate([
        {$match: {} },
        {$group: {_id: "$product_name", price: {$sum: {$toDouble:"$price"}}}}
    ]).exec(function(err, total){
        if(err){
            return callback(err)
        }else{
            return callback(err, total)
        }
    })
}
