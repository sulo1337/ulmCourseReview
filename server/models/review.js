const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    sem: {
        type: String,
        enum: ['Spring', 'Fall', 'Summer', 'Winter'],
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    upvote: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    },
    tags: {
        type: [{ type: String }]
    },
    attendance: {
        type: String,
        enum: ['Mandatory', 'Not required', 'No answer'],
        required: true,
    },
    textbook: {
        type: Boolean,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
});

function validateReview(review) {
    const schema = {
        sem: Joi.string().valid('Spring', 'Fall', 'Summer', 'Winter').required(),
        year: Joi.string().max(4).required(),
        description: Joi.string().min(10).required(),
        upvote: Joi.array().items(Joi.objectId()).required(),
        tags: Joi.array().items(Joi.string()),
        attendance: Joi.string().valid('Mandatory', 'Not required', 'No answer').required(),
        textbook: Joi.boolean().required(),
        student: Joi.objectId().required(),
        professor: Joi.objectId().required(),
        course: Joi.objectId().required()
    }
    return Joi.validate(review, schema);
}

const Review = mongoose.model('Review', reviewSchema);

module.exports.Review = Review;
module.exports.validateReview = validateReview;