//installerede funktioner der bruges
const express = require('express');
const router = express.Router();
const mysql = require('mysql');


//begrænser mængden af forbindelser til sql serveren til 10
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Passw0rd",
    database: "TEC"
})

//opretter/henter en forbindelse
function getConnection() {
    return pool
}


//håndtere anmodninger til /Bruger
router.get("/Brugere", (req, res) => {
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT Bruger_ID, Brugernavn, Navn, Bruger_type from Brugere ORDER BY Navn"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente Brugere" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /Bruger/ID
router.get("/Brugere/:ID", (req, res) => {
    console.log("henter bruger med brugernavn: " + req.params.ID)

    //tager ID fra url'et og putter det ind i variablen BrugerID
    const BrugerID = req.params.ID
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT Bruger_ID, Navn, Bruger_type from Brugere WHERE Brugernavn like ?"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [BrugerID], (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente Bruger" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//kode til login via Brugere
router.get("/Brugere/:Username/:Password", (req, res) => {
    console.log("henter bruger med brugernavn: " + req.params.ID)

    //tager Username og Password fra url'et og putter det ind i variabler
    const Username = req.params.Username
    const Password = req.params.Password
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT Bruger_ID, Navn, Bruger_type from Brugere WHERE Brugernavn LIKE ? AND Adgangskode like binary ?"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [Username, Password], (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente Bruger" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /Bruger_opret
router.post("/Bruger_opret", (req, res) => {
    console.log("prøver at oprette bruger")

    //hapser variablerne fra post requesten.
    const navn = req.body.navn
    const brugernavn = req.body.brugernavn
    const password = req.body.password
    const email = req.body.email
    const adresse = req.body.adresse
    const bruger = req.body.bruger

    //query string som afsendes til mysql serveren.
    const queryString = "Insert into Brugere (Navn, Brugernavn, Adgangskode, Email, Adresse, Bruger_type) VALUES (?, ?, ?, ?, ?, ?)"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [navn, brugernavn, password, email, adresse, bruger], (err, results, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("fejlede i at indsætte bruger" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker videre stilles brugeren til siden han kom fra.
        res.redirect('http://192.168.4.34/Bruger.html');
    })
})

//håndtere anmodninger til /Bruger/:id (slet bruger)
router.delete('/Bruger/:id', function (req, res) {
    //hapser id fra url'et og putter det ind i en variable
    const Brugerid = req.params.id
    //query string som afsendes til mysql serveren.
    const queryString = "DELETE FROM Brugere WHERE Bruger_ID = ?"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [Brugerid], (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i slette bruger" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker videre stilles brugeren til siden han kom fra.
        res.redirect('http://192.168.4.34/Bruger.html');
    })

});
module.exports = router;