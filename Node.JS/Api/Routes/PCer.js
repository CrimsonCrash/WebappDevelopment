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


//håndtere anmodninger til /PCer-ikke-solgt
router.get("/PCer-ikke-solgt", (req, res) => {

    const OrdreID = req.params.ID
    const queryString = "SELECT * from PCer WHERE Solgt = 0"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Fejlede i at hente PC" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

//håndtere anmodninger til /PCer_opret
router.post("/PCer_opret", (req, res) => {
    console.log("prøver at oprette pc")

    var reperation2 = "";
    var reservedele2 = "";
    const pcid = req.body.pcid;
    const maerke = req.body.Maerke;
    const model = req.body.Model;
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

    const queryString = "Insert into PCer (Maerke, Model, Reparation, Reparation_txt, Reservedele, Reservedele_txt, OS, Til_Salg, Skrottet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [maerke, model, reperation, reperation2, reservedele, reservedele2, os, salg, skrottet], (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte pc" + err)
            res.sendStatus(500)
            return
        }

        console.log("Indsatte pc: ", results.insertid);
        res.redirect('http://192.168.4.34/PC.html');
    })
})

//håndtere anmodninger til /PCer_opdater
router.post("/PCer_opdater", (req, res) => {
    console.log("prøver at oprette pc")

    const pcid = req.body.pcid;
    const maerke = req.body.Maerke;
    const model = req.body.Model;
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

    const queryString = "UPDATE PCer SET Maerke = '" + maerke + "', Model = '" + model + "', Reparation = " + reperation + ", Reparation_txt = '" + reperation2 + "', Reservedele = " + reservedele + ", Reservedele_txt = '" + reservedele2 + "', OS = '" + os + "', Salg = " + salg + ", Skrottet = " + skrottet + " WHERE PC_ID = '" + pcid + "'"
    getConnection().query(queryString, (err, results, fields) => {
        if (err) {
            console.log("fejlede i at indsætte pc" + err)
            res.sendStatus(500)
            return
        }

        console.log("Indsatte pc: ", results.insertid);
        res.redirect('http://192.168.4.34/PC.html');
    })

})

module.exports = router;