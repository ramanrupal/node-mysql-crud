var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyparser.json());

var con = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME || "mysql-app",
    user: process.env.MYSQL_USER || "raman",
    password: process.env.MYSQL_PASSWORD || "pass1234",
    database: process.env.MYSQL_DATABASE || "mydb",
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// for all records
app.get('/employee', function(req, res) {
    console.log(req);
    con.query('SELECT * from employees', function(err, rows, fields) {
        if (err) console.log(err);
        res.send(rows)
        console.log(rows)
    });

});

//for particular record
app.get('/employee/:id', function(req, res) {
    con.query('SELECT * FROM employees where id = ?', [req.params.id], function(err, rows, fields) {
        if (err) console.log(err);
        res.send(rows);
    });
});

//delete request
app.delete('/employee/:id', function(req, res) {
    con.query('delete from employees where id = ?', [req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.send('Record successfully deleted for ' + req.params.id);
        console.log('Deleted data from record');
    });
});

// post
app.post('/employee', function(req, res) {
    var data = req.body;
    con.query('insert into employees set ?', data, function(err, rows, fields) {
        if (err) throw err;
        res.send('Record successfully added for ' + data.name);
        console.log('Data added succesfully');
    });
});

//update 
app.put('/employee/:id', function(req, res) {
    con.query('update employees set name=?,email=?,phone=? where id=?', [req.body.name, req.body.email, req.body.phone, req.params.id], function(err, rows, fields) {
        if (err) throw err;
        console.log('data updates successfully');
        res.send("Record updated for " + req.body.name);
    });

});
app.listen(3000, function() {
    console.log("listening on port 3000");
});



