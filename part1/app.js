var express = require('express');
var mysql = require('mysql');
var app = express();
var PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DogWalkService'
});

db.connect(err => {
    if(err) {
        console.error('Datbase connection failed:', err.stack);
        return;
    }
    console.log('Connected Succesfully to database');

});

app.get('/api/dogs', (req,res) => {
    const query = '
        SELECT
        d.name AS dog_name,
        d.size,
        u.username AS owner
    FROM Dogs d
    JOIN Users u ON d.owner_id = u.user_id
    ';


})