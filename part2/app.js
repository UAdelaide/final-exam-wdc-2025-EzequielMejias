const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


app.use(session({
    secret: 'dog_walker_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}));

function requireLogin(req, res, next) {
    if(!req.session.user) {
        return res.redirect('/index.html');
    }
    next();
}
app.get('/owner-dashboard.html', requireLogin, (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'owner-dashboard.html'));
});

app.get('/walker-dashboard.html', requireLogin, (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'walker-dashboard.html'));
});

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;