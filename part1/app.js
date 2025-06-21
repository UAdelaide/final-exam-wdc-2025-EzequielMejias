var express = require('express');
var mysql = require('mysql');
var app = express();
var PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DogWalkService'
});

db.connect((err) => {
    if(err) {
        console.error('Datbase connection failed:', err.stack);
        return;
    }
    console.log('Connected Succesfully to database');

});

app.get('/api/dogs', (req,res) => {
    try {
        const query = `
            SELECT
                d.name AS dog_name,
                d.size,
                u.username AS owner
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id
            `;

        db.query(query, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }catch (err) {
         console.error('Error in /api/dogs:', err);
        return res.status(500).send('Database query error');
    }

});


app.get('/api/walkrequests/open', (req, res) => {
    try {
        const query = `
        SELECT wr.request_id, d.name As dog_name, wr.requested_time,
               wr.duration_minutes, wr.location, u.username AS owner_username
               FROM WalkRequests wr
               JOIN Dogs d ON wr.dog_id = d.dog_id
               JOIN Users u ON d.owner_id = u.user_id
               where wr.status = 'open'
               `;

        db.query(query, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
     }catch (err) {
         console.error('Error in /api/walkrequests/open:', err);
        return res.status(500).send('Walk request fetching failure');
    }
});

app.get('/api/walkers/summary', (req,res) => {
    try{
    const query=`
            SELECT u.username AS walker_username,
                COUNT(wr.rating) AS total_ratings,
                AVG(wr.rating) AS average_rating,
                COUNT(DISTINCT wa.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id AND wa.status = 'accepted'
            LEFT JOIN WalkRatings wr ON wa.request_id = wr.request_id
            WHERE u.role = 'walker'
            GROUP BY u.username
            `;
        db.query(query, (err, results) => {
        if (err) throw err;
            res.json(results);
        });
            });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});