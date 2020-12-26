const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { Review } = require('../models/review');

router.get('/', (req, res) => {
    Student.find().lean()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send("Internal Server Error!");
        })
});

router.post('/register', async (req, res) => {
    const { error } = validateRegisterForm(req.body);
    if (error) return res.status(400).send("There is an error with register details: \n" + JSON.stringify(error.details));

    var student = await Student.findOne({ email: req.body.email });
    if (student) return res.status(400).send("Student already registered");

    student = new Student({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        middle: req.body.middle,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
    await student.save();

    return res.status(200).send(`Registered successfully: ` + student._id);
});

router.post('/login', async (req, res) => {
    const { error } = validateLoginForm(req.body);
    if (error) return res.status(400).send("There is an error with login details: \n" + JSON.stringify(error.details));

    const thisStudent = await Student.findOne({ email: req.body.email });
    if (!thisStudent) return res.status(400).send("Invalid email/password");

    const validPassword = await bcrypt.compare(req.body.password, thisStudent.password);
    if (!validPassword) return res.status(400).send("Invalid email/password");

    const student = {
        email: thisStudent.email,
        fname: thisStudent.fname,
        lname: thisStudent.lname,
    }

    const token = thisStudent.generateAuthToken();
    return res.header('x-auth-token', token).status(200).send(student);

});


function validateLoginForm(req) {
    const schema = {
        email: Joi.string().min(17).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

function validateRegisterForm(req) {
    const schema = {
        email: Joi.string().min(17).max(50).required().email(),
        password: Joi.string().min(5).max(255).required(),
        fname: Joi.string().max(50).required(),
        lname: Joi.string().max(50).required(),
        middle: Joi.string().max(50)
    }
    return Joi.validate(req, schema);
}
module.exports = router;