/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express=require('express');
var bodyParser=require('body-parser');
var dbConnection=require('./dao/dbConnection');
var app=express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*
app.use(function(req,res){
    console.log('Request recieved at:'+new Date());
});
*/
dbConnection.dbConnect();
app.set('port',process.env.PORT || 9092);
app.get('/',function(req,res){
    res.sendfile('./public/home.html');
});

app.get('/employees',function(req,res){
    console.log('GET:employees');
    dbConnection.getData(function(data){
            res.status(200);
            res.send(data);
    });
});

app.post('/employee',function(req,res){
    var item=req.body;
    res.status(201);
    res.send(dbConnection.addEmployee(item));
});

app.get('/employee/:email',function(req,res){
    console.log('GET:employee');
    dbConnection.fetchEmployee(req.params.email,function(data){
        res.status(200);
        res.send(data);
    });
});

app.delete('/employee/:email',function(req,res){
    console.log('DELETE:users');
    dbConnection.removeEmployee(req.params.email,function(data){
        res.status(201);
        res.send(data);
    });
});

app.put('/employee/:email',function(req,res){
    console.log('PUT:users');
    dbConnection.updateEmployee(req.params.email,req.body,function(data){
        res.status(201);
        res.send(data);
    });
});

app.listen(app.get('port'), function() {
  console.log('App listening on port ' + app.get('port'));
});

module.exports = app;