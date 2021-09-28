var express = require('express')
//import body-parser to help work with post request 
var bodyParser = require('body-parser')
var app = express()
//configuring the app to accept json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({encode: true}))