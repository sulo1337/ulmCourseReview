const express = require('express');
const router = express.Router();
const { Review, validateReview } = require('../models/review');
const { Professor } = require('../models/professor');
const { Course } = require('../models/course');

router.get('/', (req, res) => {
    Review.find().lean()
        .then(reviews => {
            return res.status(200).send(reviews);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.post('/', async (req, res) => {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(`There is an error with review details: \n${JSON.stringify(error.details)}`);

    const professor = await Professor.findById(req.body.professor);
    if (!professor) return res.status(400).send(`Professor with given id ${req.body.professor} not found`);

    const course = await Course.findById(req.body.course);
    if (!course) return res.status(400).send(`Course with given id ${req.body.course} not found`);

    const review = new Review({
        date: Date.now(),
        sem: req.body.sem,
        year: req.body.year,
        description: req.body.description,
        upvote: req.body.upvote,
        attendance: req.body.attendance,
        textbook: req.body.textbook,
        student: req.body.student,
        professor: req.body.professor,
        course: req.body.course
    });

    await review.save();
    return res.status(200).send(review);
})

module.exports = router;