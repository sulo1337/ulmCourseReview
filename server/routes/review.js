const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Review, validateReview } = require('../models/review');
const { Professor } = require('../models/professor');
const { Course } = require('../models/course');
const { Student } = require('../models/student');

router.get('/', (req, res) => {
    Review.find().lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .then(reviews => {
            return res.status(200).send(reviews);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.get('/course', async (req, res) => {
    const course = await Course.findById(req.query.id);
    if (!course) return res.status(404).send(`Course not found ${req.query.id}`);

    Review.find({ course: course._id }).lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .sort('-date')
        .then(reviews => {
            const response = {
                course: course,
                reviews: reviews
            }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.get('/professor', async (req, res) => {
    const professor = await Professor.findById(req.query.id);
    if (!professor) return res.status(404).send(`Professor not found ${req.query.id}`);

    Review.find({ professor: professor._id }).lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .sort('-date')
        .then(reviews => {
            const response = {
                professor: professor,
                reviews: reviews
            }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.get('/my', auth, async (req, res) => {
    Review.find({ student: req.student._id }).lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .sort('-date')
        .then(reviews => {
            return res.status(200).send(reviews);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.post('/', auth, async (req, res) => {
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
        student: req.student._id,
        professor: req.body.professor,
        course: req.body.course,
        rating: req.body.rating,
        anon: req.body.anon,
        tags: []
    });
    await review.save();
    Review.find({ student: req.student._id }).lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .sort('-date')
        .then(reviews => {
            return res.status(200).send(reviews);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(`There is an error with review details: \n${JSON.stringify(error.details)}`);

    const professor = await Professor.findById(req.body.professor);
    if (!professor) return res.status(400).send(`Professor with given id ${req.body.professor} not found`);

    const course = await Course.findById(req.body.course);
    if (!course) return res.status(400).send(`Course with given id ${req.body.course} not found`);

    const review = await Review.findById(req.params.id);
    console.log(review.student);
    console.log(req.student._id);
    if (review.student != req.student._id) return res.status(401).send(`Unauthorized`);

    const updated = req.body;
    updated.student = req.student._id;

    Review.findByIdAndUpdate(req.params.id, updated, { new: true })
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .then(theReview => {
            return res.status(200).send(theReview);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.delete('/:id', auth, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send(`Review not found`);
    if (review.student != req.student._id) return res.status(401).send(`Unauthorized`);

    await Review.findByIdAndRemove(req.params.id);

    Review.find({ student: req.student._id }).lean()
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .sort('-date')
        .then(reviews => {
            return res.status(200).send(reviews);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.put('/upvote/:id', auth, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send(`Review not found`);

    const updated = review;
    if (!updated.upvote.includes(req.student._id)) {
        updated.upvote.push(req.student._id);
    }
    Review.findByIdAndUpdate(req.params.id, updated, { new: true })
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .then(theReview => {
            return res.status(200).send(theReview);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});

router.put('/downvote/:id', auth, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send(`Review not found`);
    const updated = review;
    updated.upvote = updated.upvote.filter(item => item != req.student._id);
    Review.findByIdAndUpdate(req.params.id, updated, { new: true })
        .populate('student', { password: 0, email: 0 })
        .populate('professor')
        .populate('course')
        .then(theReview => {
            return res.status(200).send(theReview);
        })
        .catch(err => {
            return res.status(500).send(`Internal Server Error`);
        });
});
module.exports = router;