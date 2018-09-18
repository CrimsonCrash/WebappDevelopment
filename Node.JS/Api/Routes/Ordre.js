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

//håndtere anmodninger til /Ordre/ID
router.get("/Ordre/:ID", (req, res) => {
    console.log("henter bruger med id: " + req.params.ID)

    const OrdreID = req.params.ID
    const queryString = "SELECT * from Ordre WHERE Ordre_ID = ?"
    getConnection().query(queryString, [OrdreID], (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Ordre" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /Ordre
router.get("/Ordre", (req, res) => {

    const queryString = "SELECT * from Ordre"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente Ordre" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /Ordre_opret
router.post("/Ordre_opret", (req, res) => {
    console.log("prøver at oprette bruger")

    const navn = req.body.Navn
    const email = req.body.Email
    const tlf = req.body.Tlf
    const adresse = req.body.Adresse
    const model = req.body.Model
    const maerke = req.body.Maerke
    const pc_id = Req.body.PC_ID
    const ansat = req.body.Ansat

    const queryString = "Insert into Ordre (Navn, Email, Tlf, Adresse, Model, Maerke, PC_ID, Ansat) VALUES ('?', '?', ?, '?', '?', '?', ?, ?)"
    getConnection().query(queryString, [navn, email, tlf, adresse, model, maerke, pc_id, ansat], (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte Ordre" + err)
            res.sendStatus(500)
            return
        }
        
        console.log("Indsatte ordre: ", results.insertid);
        res.end()
    })
})

module.exports = router;