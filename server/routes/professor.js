const express = require('express');
const router = express.Router();
const { Professor, validateProfessor } = require('../models/professor');

router.get('/', (req, res) => {
    Professor.find().lean()
        .then(professors => {
            return res.status(200).send(professors);
        })
        .catch(err => {
            return res.status(500).send(`Internal server error`);
        })
});

router.post('/', async (req, res) => {
    const { error } = validateProfessor(req.body);
    if (error) return res.status(400).send(`There is an error with professor details: \n${JSON.stringify(error.details)}`);

    const professor = new Professor({
        fname: req.body.fname,
        lname: req.body.lname,
        middle: req.body.middle
    });

    await professor.save();
    res.status(200).send(professor);
})

module.exports = router;