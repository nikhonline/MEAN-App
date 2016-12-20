/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var dbURI = 'mongodb://{dburl}/tracker';
var Employees;
function dbConnect() {
    console.log('Inside Mongo');
    // Connection URL. This is where your mongodb server is running.
   
    mongoose.connect(dbURI);
    
    mongoose.connection.on('connected', function () {
            console.log('Mongoose connected to ' + dbURI);
            var employeeSchema=new mongoose.Schema({
                        name:String,
                        email:String,
                        dob:String,
                        department:String,
                        gender:String
            });
            Employees=mongoose.model('employees',employeeSchema)
            
    });

    mongoose.connection.on('error',function (err) {
            console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected');
    });

}

function getData(cb){
            var employees=[];
                mongoose.connection.db.collection('employees',function(err,collection){
                collection.find().toArray(function(err,items){
                   for(var i in items){
                       employees.push({
                           "name":items[i].name,
                           "email":items[i].email,
                           "dob":items[i].dob,
                           "department":items[i].department,
                           "gender":items[i].gender
                       });
                   }
                    cb(employees);
                })   
            }); 
            
}

function fetchEmployee(email,cb){
    Employees.findOne({email:email},function(err,res){
        cb(res);
    });
}

function addEmployee(items){
    var newEmployee =new Employees({
        name:items.name,
        email:items.email,
        dob:items.dob,
        department:items.department,
        gender:items.gender
    });
    newEmployee.save(function(err,res){
       if(err)
       console.log(err);
       console.log(res);
    });
}

function removeEmployee(email,cb){
    Employees.remove({email:email},function(err,res){
        cb(res.name);
    });
}

function updateEmployee(email,body,cb){
    Employees.findOneAndUpdate({email:email},body,function(err,res){
        cb(res.name);
    })
}
// Functions which will be available to external callers
exports.getData = getData;
exports.dbConnect =dbConnect;
exports.fetchEmployee=fetchEmployee;
exports.addEmployee=addEmployee;
exports.removeEmployee=removeEmployee;
exports.updateEmployee=updateEmployee;
