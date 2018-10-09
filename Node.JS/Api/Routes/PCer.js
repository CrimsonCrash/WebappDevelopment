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

    //query string som afsendes til mysql serveren.
    const queryString = "SELECT * from PCer"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente PCer" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /PCer/ID
router.get("/PCer/:ID", (req, res) => {
    console.log("henter pc med id: " + req.params.ID)

    //tager ID fra url'et og putter det ind i variablen PCID
    const PCID = req.params.ID
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT * from PCer WHERE PC_ID = ?"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [PCID], (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente PC" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})


//håndtere anmodninger til /PCer-ikke-solgt
router.get("/PCer-ikke-Optaget", (req, res) => {

    //tager ID fra url'et og putter det ind i variablen PCID
    const OrdreID = req.params.ID
    //query string som afsendes til mysql serveren.
    const queryString = "SELECT * from PCer WHERE Optaget = 0"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, (err, rows, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("Fejlede i at hente PC" + err)
            res.sendStatus(500)
            return
        }
        //hvis query'et virker sendes json tilbage med info'en fra mysql serveren.
        res.json(rows)
    })
})

//håndtere anmodninger til /PCer_opret
router.post("/PCer_opret", (req, res) => {
    console.log("prøver at oprette pc")

    //opretter 2 variabler.
    var reperation2 = "";
    var reservedele2 = "";
    //hapser variablerne fra post requesten.
    const maerke = req.body.Maerke;
    const model = req.body.Model;
    //checker variablerne i nogle requests og definere værdien ud fra dem.
    if (!req.body.Reperation1) {
        var reperation = 0;
    } else {
        var reperation = 1;
        reperation2 = req.body.Reperation2;
    }
    if (!req.body.Reservedele1) {
        var reservedele = 0;
    } else {
        var reservedele = 1;
        reservedele2 = req.body.Reservedele2;
    }
    const os = req.body.OS;
    if (!req.body.Salg) {
        var salg = 0;
    } else {
        var salg = 1;
    }
    if (!req.body.Skrottet) {
        var skrottet = 0;
    } else {
        var skrottet = 1;
    }

    //query string som afsendes til mysql serveren.
    const queryString = "Insert into PCer (Maerke, Model, Reparation, Reparation_txt, Reservedele, Reservedele_txt, OS, Til_Salg, Skrottet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, [maerke, model, reperation, reperation2, reservedele, reservedele2, os, salg, skrottet], (err, results, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("fejlede i at indsætte pc" + err)
            res.sendStatus(500)
            return
        }

        console.log("Indsatte pc: ", results.insertid);
        //hvis query'et virker videre stilles brugeren til siden han kom fra.
        res.redirect('http://192.168.4.34/PC.html');
    })
})

//håndtere anmodninger til /PCer_opdater
router.post("/PCer_opdater", (req, res) => {
    console.log("prøver at oprette pc")

    //hapser variablerne fra post requesten.
    const pcid = req.body.pcid;
    const maerke = req.body.Maerke;
    const model = req.body.Model;
    //checker variablerne i nogle requests og definere værdien ud fra dem.
    if (!req.body.Reperation1) {
        var reperation = 0;
    } else {
        var reperation = 1;
    }
    const reperation2 = req.body.Reperation2;
    if (!req.body.Reservedele1) {
        var reservedele = 0;
    } else {
        var reservedele = 1;
    }
    const reservedele2 = req.body.Reservedele2;
    const os = req.body.OS;
    if (!req.body.Salg) {
        var salg = 0;
    } else {
        var salg = 1;
    }
    if (!req.body.Skrottet) {
        var skrottet = 0;
    } else {
        var skrottet = 1;
    }

    //query string som afsendes til mysql serveren.
    const queryString = "UPDATE PCer SET Maerke = '" + maerke + "', Model = '" + model + "', Reparation = " + reperation + ", Reparation_txt = '" + reperation2 + "', Reservedele = " + reservedele + ", Reservedele_txt = '" + reservedele2 + "', OS = '" + os + "', Til_Salg = " + salg + ", Skrottet = " + skrottet + " WHERE PC_ID = '" + pcid + "'"
    //commando der aktivere getconnection og afsender query til forbindelsen.
    getConnection().query(queryString, (err, results, fields) => {
        //fejl håndtering.
        if (err) {
            console.log("fejlede i at indsætte pc" + err)
            res.sendStatus(500)
            return
        }

        console.log("Indsatte pc: ", results.insertid);
        //hvis query'et virker videre stilles brugeren til siden han kom fra.
        res.redirect('http://192.168.4.34/PC.html');
    })

})

module.exports = router;