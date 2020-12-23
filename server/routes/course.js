const express = require('express');
const router = express.Router();
const { Course, validateCourse } = require('../models/course');

router.get('/', (req, res) => {
    Course.find().lean()
        .then(courses => {
            return res.status(200).send(courses);
        })
        .catch(err => {
            return res.status(500).send(`Internal server error`);
        })
});

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(`There is an error with course details: \n${JSON.stringify(error.details)}`);

    const course = new Course({
        cname: req.body.cname,
        ccode: req.body.ccode,
        hours: req.body.hours
    });

    await course.save();
    res.status(200).send(course);
})

module.exports = router;