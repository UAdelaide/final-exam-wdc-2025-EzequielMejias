var express = require('express');
var mysql = require('mysql');
var app = express();
var PORT = 3000;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DogWalkService'
});
