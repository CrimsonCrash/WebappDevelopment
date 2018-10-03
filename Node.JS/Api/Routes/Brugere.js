//installerede funktioner der bruges
const express = require('express');
const router = express.Router();
const mysql = require('mysql');


//begrænser mængden af forbindelser til 10
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

    const queryString = "SELECT Bruger_ID, Navn, Bruger_type from Brugere"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Brugere" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /Bruger/ID
router.get("/Brugere/:ID", (req, res) => {
    console.log("henter bruger med brugernavn: " + req.params.ID)

    const OrdreID = req.params.ID
    const queryString = "SELECT Bruger_ID, Navn, Bruger_type from Brugere WHERE Brugernavn = ?"
    getConnection().query(queryString, [OrdreID], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Bruger" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//kode til login via Brugere
router.get("/Brugere/:Username/:Password", (req, res) => {
    console.log("henter bruger med brugernavn: " + req.params.ID)

    const Username = req.params.Username
    const Password = req.params.Password
    const queryString = "SELECT Bruger_ID, Navn, Bruger_type from Brugere WHERE Brugernavn LIKE ? AND Adgangskode LIKE ?"
    getConnection().query(queryString, [Username, Password], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Bruger" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /Bruger_opret
router.post("/Bruger_opret", (req, res) => {
    console.log("prøver at oprette bruger")

    const navn = req.body.navn
    const brugernavn = req.body.brugernavn
    const password = req.body.password
    const email = req.body.email
    const adresse = req.body.adresse
    const bruger = req.body.bruger

    const queryString = "Insert into Brugere (Navn, Brugernavn, Adgangskode, Email, Adresse, Bruger_type) VALUES (?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [navn, brugernavn, password, email, adresse, bruger], (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte bruger" + err)
            res.sendStatus(500)
            return
        }

        console.log("Indsatte bruger: ", results.insertid);
        res.redirect('http://192.168.4.34/Bruger.html');
    })
})

router.delete('/Bruger/:id', function (req, res) {

    const Brugerid = req.params.id
    const queryString = "DELETE FROM Brugere WHERE Bruger_ID = ?"
    getConnection().query(queryString, [Brugerid], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i slette bruger" + err)
            res.sendStatus(500)
            return
        }
        res.redirect('http://192.168.4.34/Bruger.html');
    })
    
});
module.exports = router;