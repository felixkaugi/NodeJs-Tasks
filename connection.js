// module.exports = function(callback){
//     var MongoClient = require('mongodb').MongoClient
//     // var MongoClient = mongodb.MongoClient
  
// }

// class students{
//     constructor(name){
//          this.name
//     }
// }

var MongoClient = require('mongodb').MongoClient

var DbConn={

    init:function(){
        var url = 'mongodb://localhost:27017/Login'
       return  MongoClient.connect(url, callback)
    },

    createRecord:function(data,callback){
        //create db connection 

        //create record in db
        //return response 
        return callback(err,data)

    }
}

module.export=DbConn;
//callback functions
//jAVASCEIPT callback fnction 
// function myDisplayer(total){
//     console.log("the answer is" +total)
// }
// function myCalculator(num1,num2, callback){
//     var product = num1 * num2
//     callback(product)
// }
// myCalculator(2,3, myDisplayer)
///example two
// function finalCost(total){
//     addedVAT(0.18*(100))
//     console.log(total)
// }
// function products(toothpaste, apples,pen,book,callback){
//     var price = (toothpaste + apples +pen + book)
//     callback(price)
//     return price;
// }
// var cost = products(100,50,10,50, finalCost)


// //function with added VAT
// function addedVAT(taxRate,price){
//     var rate = taxRate * price
//     // var results = cost * rate
//    var total = rate + price
//    return total 
// }
// console.log(addedVAT(0.16, cost))
function finalCost(total){
    console.log(total)
}
function products(toothpaste, apples,pen,book,callback){
    var prices = ()
}

var employees = [
    {
        "name": "Felix",
        "grossSalary": 100000
    },{
        "name": "Joseph",
        "grossSalary": 105000
    }
]

var deductions = [
    {
        "Name": "NHIF",
        "value": 5000
    }, {
        "Name": "PAYE",
        "value": 12000
    }, {
        "Name": "NSSF",
        "value": 1200
    },
    {
        "Name": "Loan",
        "value": 30000
    }
]


// NetSalary=Gross-deductions;
// Calculate the net salary of each employee. 
// Create a function which returns the net Salary of each employee and takes
//  a list of employees and the deductions as parameters 

function netSalary(employees,deductions){
  var salary=0;
  for(var i=0;i<employees.length;i++){
    var grossSalary=employees[i].grossSalary;
    var totalDeductions=0;
    for(var j=0;j<deductions.length;j++){

      totalDeductions=totalDeductions+deductions[j].value;


    }

    salary=grossSalary-totalDeductions;


  }

  return salary;
}

console.log("Net Salary "+netSalary(employees,deductions))

var employees = [
    {
        "name": "Felix",
        "grossSalary": 100000
    },{
        "name": "Joseph",
        "grossSalary": 105000
    }
]

var deductions =[
    {
        "Name": "NHIF",
        "value": 5000
    }, {
        "Name": "PAYE",
        "value": 12000
    }, {
        "Name": "NSSF",
        "value": 1200
    },
    {
        "Name": "Loan",
        "value": 30000
    }
]
function myDispalyer(some){
    console.log(some)
}
function myCalculator(num1, num2{

})
function grossSalary(employees, deductions){
    var salary = 0;
    for(var i = 0; i<employees.length; i++){
        //console.log(employees[i].value)
        var employeesGross = employees[i].value
    }
    return employeesGross;
}
function netSalary(employeesGross, grossSalary){
    var totalDeductions=0;
          for(var j=0;j<deductions.length;j++){
      
            totalDeductions=totalDeductions+deductions[j].value;
          }
      
}

// NetSalary=Gross-deductions;
// Calculate the net salary of each employee. 
// Create a function which returns the net Salary of each employee and takes
//  a list of employees and the deductions as parameters 

// function salary(employees, deductions){
//     for(var i = 0; i<employees.length; i++){
//         console.log(employees[i].name)
//     }
//     for(var j = 0; j < deductions.length; j++){
//         var totalDeductions = 0
//         totalDeductions = totalDeductions + deductions[j].value
//         console.log(totalDeductions = totalDeductions + deductions[j].value)
//     }
// }salary(employees, deductions)
function netSalary(employees,deductions){
    var salary=0;
    for(var i=0;i<employees.length;i++){
      var grossSalary=employees[i].grossSalary;
      var totalDeductions=0;
      for(var j=0;j<deductions.length;j++){
  
        totalDeductions=totalDeductions+deductions[j].value;
  
  
      }
  
      salary=grossSalary-totalDeductions;
  
  
    }
  
    return salary;
  }
  
  console.log("Net Salary "+netSalary(employees,deductions))



 function grossSalary(employees, deductions){
     for(var i = 0; i< employees.length; i++){
         console.log(employees[i].grossSalary)
         var totalDeductions = 0;
         for(var j = 0; j< deductions.length; j++){
           totalDeductions =  totalDeductions + deductions[j].value;
         }
         
     }
 }grossSalary(employees, deductions)



 function netSalary(employees,deductions){
    const user = Array();
  for (let index = 0; index < employees.length; index++) {
      const element = employees[index];

      var deduct = 0;

      for (let i = 0; i < deductions.length; i++) {
          const value =parseInt(deductions[i]['value']);
            deduct = deduct +value;

                 
            
      }

      var salary =parseInt(element['grossSalary']);

      var NetSalary = Math.floor(salary - deduct);
      user.push({name:element['name'],NetSalary:NetSalary});


      
  }

  console.log(user)

}




// NetSalary=Gross-deductions;
// Calculate the net salary of each employee. 
// Create a function which returns the net Salary of each employee and takes
//  a list of employees and the deductions as parameters 

function netSalary(employees,deductions){
    const user = Array();
  for (let index = 0; index < employees.length; index++) {
      const element = employees[index];

      var deduct = 0;

      for (let i = 0; i < deductions.length; i++) {
          const value =parseInt(deductions[i]['value']);
            deduct = deduct +value;

                 
            
      }

      var salary =parseInt(element['grossSalary']);

      var NetSalary = Math.floor(salary - deduct);
      user.push({name:element['name'],NetSalary:NetSalary});


      
  }

  console.log(user)

}

function netSalary(employee,deductions){
    var arr = [];
    for(var i =0; i < employees.length; i++){
        var empGrossSalary = employees[i]
        var deduction = 0;
        for(var j = 0;  j< deduction.length; j++){
            var value = deductions[i]['value']
            deduction = deduction + value
        } 
        var salary = empGrossSalary['grossSalary']
        var netSalary = salary - deductions
        arr.push({name:empGrossSalary['name'], netSalary:netSalary})
    }
    console.log(err)
}
netSalary(employees, deductions)



// var MongoClient = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/login'
// MongoClient.connect(url, function(err,callback){
//     console.log('connected sucessfully')
// })
var MongoClient = require('mongodb').MongoClient

var dbClass = {
    init: function(callback){
     var url = 'mongodb://localhost:27017/Login'
     var dbschema = MongoClient.connect(url,function(err, db){
        if(err) throw err;
        return callback (err, db)
     })
         
    },
    createRecord: function(data, callback){
        
        this.init(callback, function(err,db){

        })
        dbschema.collection('user_login').insertOne(data, function(err,results){
           if(err) throw err;
           console.log('User created sucessifully')
       })
    }
}
module.exports = dbClass
