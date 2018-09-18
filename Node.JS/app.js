//installerede funktioner der bruges
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const OrdreRoutes = require('./Api/Routes/Ordre');
const PCerRoutes = require('./Api/Routes/PCer');


//connection string til mysql databasen
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd",
    database: "TEC"
});

//test af forbindelse til mysql
con.connect(function(err){
    if (err) throw err;
    console.log("forbundet til mysql server!");
});

//hvad for data former der bliver sendt til serveren.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Ruter der håndtere anmodninger
app.use('/Ordre', OrdreRoutes);
app.use('/PCer', PCerRoutes);

//fejl håndtering hvis der indtastes en adresse der ikke findes
app.use((req, res, next) => {
    const error = new error('En api med dette navn er ikke fundet.');
    error.status = 404;
    next(error);
})

//fejl håndtering hvis der opstår en fejl der ikke håndteres eller databasen kaster en fejl
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;