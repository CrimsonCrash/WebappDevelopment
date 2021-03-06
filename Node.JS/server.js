//definere moduler der bruges i programmet.
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: false
}))

//definere porten serveren køre på
app.listen(3000, () => {
    console.log("server køre på port 3000")
})

//hvad for data former der bliver sendt til serveren.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//tilladte headers i anmodninger.
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
const OrdreRouter = require('./Api/Routes/Ordre')
app.use(OrdreRouter)
const PCRouter = require('./Api/Routes/PCer')
app.use(PCRouter)
const BrugerRouter = require('./Api/Routes/Brugere')
app.use(BrugerRouter)


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