//creating the user schema
var Joi = require('joi')
var mongoose = require('mongoose')
var User = mongoose.model('User', new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    Email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}));
//craete a function for validation
function validateUser(user){
    var schema = {
        Username: Joi.string().mins(5).max(50).required(),
        Email: Joi.string().min(5).max(255).required().Email(),
        Password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)
}
//export the user modules and validate
exports.User = User;
exports.validate = validateUser;