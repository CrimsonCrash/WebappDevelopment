//installerede funktioner der bruges
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//henter tabelen.
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'håndtering af GET anmodninger til /Ordre'
    })
});

//indsætter data i tabelen.
router.post('/', (req, res, next) =>{
    const Ordre = {
        navn: req.body.navn,
        email: req.body.email,
        tlf: req.body.tlf,
        adresse: req.body.adresse,
        model: req.body.model,
        maerke: req.body.maerke,
        PC_ID: req.body.PC_ID,
        ansat: req.body.ansat
    };
    mysqlConnection.query('SELECT * from Ordre', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
    res.status(201).json({
        message: 'håndtering af POST anmodninger til /Ordre',
        createdOrdre: Ordre
    });
});

//henter en specific ordre ud fra ordre_id
router.get('/:Ordre_ID', (req, res, next) => {
    const id = req.params.Ordre_ID;
    if (id === 'special') {
        res.status(200).json({
            message: 'Du har opdaget '
        })
    }
})

//opdatere en specific ordre ud fra ordre_id
router.patch('/:Ordre_ID', (req, res, next) => {
    res.status(200).json({
        message: 'Opdaterede Ordre.'
    })
})

//sletter en specific ordre ud fra ordre_id
router.delete('/:Ordre_ID', (req, res, next) => {
    res.status(200).json({
        message: 'Slettede Ordre.'
    })
})

module.exports = router;