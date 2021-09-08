var express = require('express')
var app = express()
//create server
var server =  app.listen(7070, ()=>{
    //create a route
    app.get('/students/list', (req,res)=>{
        var data = [{
            Name: 'Kaugi',
            RegNo: 'EDS1',
            Coures: 'Computer Science',
            Units:{
                COSC100: 'Object Oriented Programming',
                COSC101: 'Fundamentals of Programming',
                COSC103: 'Database management',
                COSC104: 'Digital Electronics'
            }
        },{
            Name: 'Ian',
            RegNo: 'ED2',
            Coures: 'Criminology',
            Units:{
                CBB01: 'Human Rights',
                CBB02: 'Internatinal Law',
                CBC03: 'Zoology',
                COSC04: 'Philosophy'
            }
        }
    ]
        res.json(data)
        for(var i = 0; i < data.length; i++){
            console.log(data[i].Name)
        }
    })
    //creating an array with product, price, Discount and manfactures details
    //create a route
    app.get('/products/list', (req,res)=>{
        var product =[{
            Product_Name: 'Sumsung Phone',
            Price: 10000,
            Discount: '5%',
            Manfactures_details:{
                Name: 'Samsung Electronics',
                Location: 'Tatu City'
            }
        },{
            Product_Name: 'Neon',
            Price: 4999,
            iscount: '3%',
            Manfactures_details:{
                Name:'Neon Smart Phones',
                Location: 'Garden City Nairobi'
            }
        }]
        res.json(product)
        for(var i = 0; i < product.length; i++){
            console.log(product[i].Product_Name)
        }
    })
   
})