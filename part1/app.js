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
    const query = `
        SELECT
            d.name AS dog_name,
            d.size,
            u.username AS owner
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
        `;

        db.query(query, (err, dogs) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Databse error');

            }
            res.json(dogs);

        });

});

app.get('/api/walkrequests/open', (req, res) => {
    db.query(`
        SELECT wr.request_id, d.name As dog_name, wr.requested_time,
               wr.duration_minutes, wr.location, u.username AS owner_username
               FROM WalkRequests wr
               JOIN Dogs d ON wr.dog_id = d.dog_id
               JOIN Users u ON d.owner_id = u.user_id
               where wr.status = 'open'
               `, (err,results) => {
                if (err){
                console.error(err);
                return res.status(500).json({error:'Databse error'});
               }
               res.json(results);
            });


    });

    app.get('/api/walkers/summary', (req,res) => {
        db.query(`
            SELECT u.username AS walker_username,
            C



            )




    })