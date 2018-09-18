//installerede funktioner der bruges
const express = require('express');
const router = express.Router();

//hent tabelen
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'PCer hentet'
    })
});

//indsæt data i tabelen
router.post('/', (req, res, next) => {
    const PCer = {
        maerke: req.body.maerke,
        model: req.body.model,
        reparation: req.body.reparation,
        reparation_txt: req.body.reparation_txt,
        reservedele: req.body.reservedele,
        reservedele_txt: req.body.reservedele_txt,
        os: req.body.os,
        salg: req.body.salg,
        skrottet: req.body.skrottet
    };
    res.status(201).json({
        message: 'PCer oprettet',
        PCer: PCer
    })
});

//hent en specific pc ud fra pc_id
router.get('/:PC_ID', (req, res, next) => {
    res.status(200).json({
        message: 'PCer detaljer',
        PC_ID: req.params.PC_ID
    })
});

//slet en bestemt pc ud fra pc_id
router.delete('/:PC_ID', (req, res, next) => {
    res.status(200).json({
        message: 'PCer slettet',
        PC_ID: req.params.PC_ID
    })
});
module.exports = router;