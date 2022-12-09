// including the packages
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');


//making the variable out of the package function
const app = express();

//creating a database connection
const db = mysql.createConnection({
    host:"database-1.ceedmie6y0m6.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password:"aditya2110",
    database:"covidbase"
});

db.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected');
});

//setting views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//creating an arrow function
app.get('/',(req,res)=>{
    let sql = "SELECT * FROM new_table";
    let query = db.query(sql,(err,rows)=>{
        if(err) throw err;
        res.render('index',{
            title : 'Welcome To AWS TODO List',
            users : rows
        });
    });
});

app.get('/add',(req,res)=>{
    res.render('add',{
        title : 'Welcome To AWS TODO List'
    })
});

app.post('/save',(req,res)=>{
    let data = {todo: req.body.todo, priority: req.body.priority, description: req.body.description, status: req.body.status};
    let sql = "INSERT INTO new_table SET?";
    let query = db.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:userId',(req,res)=>{
    const userId = req.params.userId;
    let sql = `SELECT * FROM new_table where id = ${userId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.render('edit',{
            title: 'Welcome To AWS TODO List',
            users: result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    const userId = req.params.id;

});

app.get('/delete/:userId',(req,res)=>{
    const userId = req.params.userId;
    let sql = `DELETE FROM new_table where id = ${userId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect('/');
        });
    });

//now listening to the server
app.listen(8080,()=>{
    console.log("Server is now running on port 8080");
});