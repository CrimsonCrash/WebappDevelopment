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

    //tager ID fra url'et og putter det ind i variablen OrdreID
    const OrdreID = req.params.ID
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT * from Ordre WHERE Ordre_ID = ?"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [OrdreID], (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente Ordre" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /Ordre
router.get("/Ordre", (req, res) => {

    //query string som afsendes til mysql serveren.
    const queryString = "SELECT * from Ordre"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente Ordre" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /Ordre_opret
router.post("/Ordre_opret", (req, res) => {
    console.log("prøver at oprette ordre")

    //hapser variablerne fra post requesten.
    const navn = req.body.Navn
    const email = req.body.Email
    const tlf = req.body.Tlf
    const adresse = req.body.Adresse
    const model = req.body.Model
    const maerke = req.body.Maerke
    const pc_id = req.body.PC_ID
    const ansat = req.body.Ansat

    //query string som afsendes til mysql serveren.
    const queryString = "Insert into Ordre (Navn, Email, Tlf, Adresse, Model, Maerke, PC_ID, Ansat) VALUES (?, ?, ?, ?, ?, ?, null, ?)"
    //commando der aktivere getconnection og afsender query til forbindelsen.
     getConnection().query(queryString, [navn, email, tlf, adresse, model, maerke, ansat], (err, results, fields) => {
            //fejl håndtering.
        if (err) {
            console.log("fejlede i at indsætte Ordre" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker videre stilles brugeren til siden han kom fra.
        res.redirect('http://192.168.4.34/Ordre.html');
    })
    return 
})

//håndtere anmodninger til /Ordre_opdater
router.post("/Ordre_opdater", (req, res) => {
    console.log("prøver at opdatere ordre")

    //hapser variablerne fra post requesten.
    const ordreid = req.body.OrdreID
    const navn = req.body.Navn
    const email = req.body.Email
    const tlf = req.body.Tlf
    const adresse = req.body.Adresse
    const model = req.body.Model
    const maerke = req.body.Maerke
    const pcid = req.body.PCID
    const ansat = req.body.Ansat
    const OrdreStatus = req.body.OrdreStatus

    //if der checker om pc_id er tomt
    if (!req.body.PCID) {
        //query string som afsendes til mysql serveren.
        const queryString = "UPDATE Ordre SET Navn = '" + navn + "', Email = '" + email + "', Tlf = '" + tlf + "', Adresse = '" + adresse + "', Model = '" + model + "', Maerke = '" + maerke + "', PC_ID = null, Ansat = " + ansat + ", Ordre_Status = '" + OrdreStatus + "' WHERE Ordre_ID = " + ordreid + ";";
        //commando der aktivere getconnection og afsender query til forbindelsen.
        getConnection().query(queryString, (err, results, fields) => {
            //fejl håndtering.
            if (err) {
                console.log("fejlede i at indsætte Ordre" + err)
                res.sendStatus(500)
                return
            }

            console.log("querystring: " + queryString)
            //hvis query'et virker videre stilles brugeren til siden han kom fra.
            res.redirect('http://192.168.4.34/Ordre.html');
        })
    }
    else {
        //query string som afsendes til mysql serveren.
        var queryString = "UPDATE Ordre SET Navn = '" + navn + "', Email = '" + email + "', Tlf = '" + tlf + "', Adresse = '" + adresse + "', Model = '" + model + "', Maerke = '" + maerke + "', PC_ID = " + pcid + ", Ansat = " + ansat + ", Ordre_Status = '" + OrdreStatus + "' WHERE Ordre_ID = " + ordreid + ";";
        //commando der aktivere getconnection og afsender query til forbindelsen.
        getConnection().query(queryString, (err, results, fields) => {
            //fejl håndtering.
            if (err) {
                console.log("fejlede i at indsætte Ordre" + err)
                res.sendStatus(500)
                return
            }

            console.log("querystring: " + queryString)
            //hvis query'et virker videre stilles brugeren til siden han kom fra.
        })
        //query string som afsendes til mysql serveren.
        queryString = "UPDATE PCer SET Optaget = 1 WHERE PC_ID = '" + pcid + "';";
        //commando der aktivere getconnection og afsender query til forbindelsen.
        getConnection().query(queryString, (err, results, fields) => {
            //fejl håndtering.
            if (err) {
                console.log("fejlede i at indsætte Ordre" + err)
                res.sendStatus(500)
                return
            }

            console.log("querystring: " + queryString)
            //hvis query'et virker videre stilles brugeren til siden han kom fra.
            res.redirect('http://192.168.4.34/Ordre.html');
        })
    }
})
module.exports = router;