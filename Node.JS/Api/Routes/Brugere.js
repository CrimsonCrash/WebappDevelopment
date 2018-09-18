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

    const queryString = "SELECT * from Brugere"
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
    const queryString = "SELECT * from Brugere WHERE Brugernavn = ?"
    getConnection().query(queryString, [OrdreID], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Bruger" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /Bruger_opret
router.post("/Brugere_opret", (req, res) => {
    console.log("prøver at oprette bruger")

    const navn = req.body.Navn
    const brugernavn = req.body.Brugernavn
    const adgangskode = req.body.Adgangskode
    const email = req.body.Email
    const adresse = req.body.Adresse
    const bruger_type = Req.body.Bruger_type

    const queryString = "Insert into Brugere (Navn, Brugernavn, Adgangskode, Email, Adresse, Bruger_type) VALUES ('?', '?', '?', '?', '?', ?)"
    getConnection().query(queryString, [maerke, model, reparation, reparation_txt, reservedele, reservedele_txt, os, salg, skrottet], (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte bruger" + err)
            res.sendStatus(500)
            return
        }
        
        console.log("Indsatte bruger: ", results.insertid);
        res.end()
    })
})

module.exports = router;