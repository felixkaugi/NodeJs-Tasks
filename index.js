var express = require('express')
var app = express();
//set port
var server = app.listen(7070, () =>{
    app.get('/', (req, res)=>{
        res.send('Hello World');
    });
});