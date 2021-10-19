var mongoose = require('mongoose')
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
        type: Number
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