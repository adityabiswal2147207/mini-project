//importing the modules
const express = require('express');
var ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');


//this is the demo connection dont use this one
const db = mysql.createConnection({
    host:"",
    port:"",
    user:"",
    password:"",
    database:""
});




//calling the function into the variable name of tyoe constant
const app = express();

//setting up the engine and serving the folder 
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(8080);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){

    const db = mysql.createConnection({
        host:"database-1.ceedmie6y0m6.us-east-1.rds.amazonaws.com",
        port:"3306",
        user:"admin",
        password:"aditya2110",
        database:"covidbase"
    });

    db.query("SELECT * FROM info",(err,result)=>{

        res.render('pages/index',{result:result});
    })
    
});