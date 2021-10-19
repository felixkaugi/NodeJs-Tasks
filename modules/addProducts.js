var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Userauth')
//create schema
var productSchema = mongoose.Schema({
    product_id :{
        type:String
    },
    product_name :{
        type: String
    }
})
var products = module.exports = mongoose.model('products', productSchema)
module.exports.createProduct = function(newProduct,callback){
    // console.log('newProduct')
    // console.log(newProduct)
    newProduct.save(callback)
}
//module to list products
module.exports.getProducts = function(callback){
    products.find({}).exec(function(err,product){
        if(err){
            return callback(err)
        }else{
            return callback(err, product)
        }
    })
}
//module to update products in the inventory
module.exports.updateProducts = function(product, price,stock, callback){
    products.findOneAndUpdate({product, price, stock})
    .exec(function(err,productz){
        if(err){
            return callback(err)
        }else{
            return callback(err, productz)
        }
    })
}