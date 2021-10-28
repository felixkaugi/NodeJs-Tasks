var mongoose = require('mongoose')
var sales = require('./sales')
mongoose.connect('mongodb://localhost:27017/Userauth')
//create stock schema
var stockSchema = mongoose.Schema({
    barcode:{
        type: Number
    },
    product_name:{
        type: String
    },
    price:{
        type: String
    },
    stocks:{
        type: String 
    },
    units:{
        type: String
    }
})
//create a module to add new Stock
var stock = module.exports = mongoose.model('Stock', stockSchema)
module.exports.createNewStock = function(newStock, callback){
    newStock.save(callback)
}
//add module to list the stock in the inventory
module.exports.getStock = function(callback){
    stock.find({}).exec(function(err,product){
        if(err){
            return callback(err)
        }else{
            return callback(err,product)
        }
    })
}
// module.exports.countProducts = function(callback){
//     stock.aggregate([
//         {$group: {_id: "$product_name", "Number_of_products": {"$sum": 1} }},
//         {"$sort": {"_id": 1}}
//     ]).exec(function(err, productCount){
//         if(err){
//         return callback(err)
//         }
//         else{
//         return callback(err, productCount)
//         }
//     })
// }
module.exports.stockWorth = function(callback){
    stock.aggregate([
        {
            $group: {
                
                    _id: "stock",
                    "totalAmount": {
                        $sum: {$toDouble: '$price'}
                    }
                
            }
        }
    ]).exec(function(err, totalSum){
        if(err){
            return callback(err)
        }else{
            return callback(err, totalSum)
        }
    })
}
