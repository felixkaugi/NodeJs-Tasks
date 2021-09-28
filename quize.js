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

function netSalary(employee,deductions){
    var arr = [];
    for(var i =0; i < employees.length; i++){
        var empGrossSalary = employees[i]
        var deduction = 0;
        for(var j = 0;  j< deductions.length; j++){
            var value = deductions[j].value
            
            deduction = deduction + value
        } 
        var salary = parseInt(empGrossSalary['grossSalary'])
        var netSalary = salary - deduction
        arr.push({name:empGrossSalary['name'], netSalary:netSalary})

    }
    console.log(arr)
}
netSalary(employees, deductions)