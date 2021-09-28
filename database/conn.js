//creating connection to the db
var mongoose = require('mongoose');
var schema = require('../modules/schema')
//create a database class
class Database {
    constructor(){
        this._connect()
    }
    _connect(){
        mongoose.connect('mongodb://localhost:27017/userDb')
        .then(()=>{
            console.log('Database connected')
        })
        .catch(err=>{
            console.log('Database connection Error ')
        })
    }
    //creating record
    _createRecord(){
       var db = mongoose.connect('mongodb://localhost:27017/userDb')
       db.collection('Users').insertOne({'Username': req.body.Username, 
       'Password': req.body.Password, 'Email': req.body.Email})
        db.save()
        .then(doc =>{
            console.log(doc)
        })
        .catch(err =>{
            console.log(err)
        })
    }
   
}
module.exports = new Database