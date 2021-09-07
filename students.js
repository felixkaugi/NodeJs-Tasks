//importing express
var express = require('express')
var app = express()
//creating a server
var server = app.listen(7070, ()=>{
    //creating a route /students/list
    app.get('/students/list', (req, res)=>{
       //retuning a json data 
      res.json({
          Name: 'Kaugi',
          id: 1,
          Coures: 'computer science',
          units:{
              cosc101: 'Database Management',
              cosc102: 'Fundamentals of Programming',
              cosc103: 'Digital Electronics',
              cosc104: 'Emergening Technology',
              cosc105: 'computing math',
              cosc106: 'object oriented programming'
          },
      })
    })
})