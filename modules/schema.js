var mongoose = require('mongoose')
var validator = require('validator')
var myschema = new mongoose.Schema({
    Username: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    
    Password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    Email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) =>{
            return validator.isEmail(value)
        }
    }
})
module.exports = mongoose.model('myschema' ,myschema)

