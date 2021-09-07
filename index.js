//importing express
/*var express = require('express')
var app = express()
//setting the server port'
var server = app.listen(7070, ()=>{
    //setting the route
    app.get('/students/list', (req,res)=>{
        //get response in the json formart
        res.json(
            {
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
            }
        )
    })
})*/

var express = require('express')
var app = express();
//creatin server
var server = app.listen(7070, ()=>{
    //creating route
    app.get('/product/list',(req,res)=>{
        res.json([{
            Samsung_laptop:{
                price: 450000,
                discount: '5%',
                Manufactorer_details:{
                    Name: 'Sumsung Electronic',
                    Location: 'Tatu city Along Ruiru Kiambu Road'
                }
            },
            Neon_phone:{
                price: 4999,
                discount: '3%',
                Manufactorer_details:{
                    Name: 'Neon Smartphone Manufactores',
                    Location: 'Garden City Nairobi'
                }
            }
        }])
    })
})