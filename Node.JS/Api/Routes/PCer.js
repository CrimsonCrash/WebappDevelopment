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

//håndtere anmodninger til /PCer
router.get("/PCer", (req, res) => {

    const queryString = "SELECT * from PCer"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente PCer" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /PCer/ID
router.get("/PCer/:ID", (req, res) => {
    console.log("henter pc med id: " + req.params.ID)

    const OrdreID = req.params.ID
    const queryString = "SELECT * from PCer WHERE PC_ID = ?"
    getConnection().query(queryString, [OrdreID], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente PC" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /PCer_opret
router.post("/Ordre_opret", (req, res) => {
    console.log("prøver at oprette pc")

    const maerke = req.body.Maerke
    const model = req.body.Model
    const reparation = req.body.Reparation
    const reparation_txt = req.body.Reparation_txt
    const reservedele = req.body.Reservedele
    const reservedele_txt = Req.body.Reservedele_txt
    const os = req.body.OS
    const salg = req.body.Salg
    const skrottet = req.body.Skrottet

    const queryString = "Insert into PCer (Maerke, Model, Reparation, Reparation_txt, Reservedele, Reservedele_txt, OS, Salg, Skrottet) VALUES ('?', '?', ?, '?', ?, '?', '?', ?, ?)"
    getConnection().query(queryString, [maerke, model, reparation, reparation_txt, reservedele, reservedele_txt, os, salg, skrottet], (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte pc" + err)
            res.sendStatus(500)
            return
        }
        
        console.log("Indsatte pc: ", results.insertid);
        res.end()
    })
})

module.exports = router;