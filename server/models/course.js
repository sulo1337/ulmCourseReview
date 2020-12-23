const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = mongoose.Schema({
    cname: {
        type: String,
        required: true,
    },
    ccode: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    }
});

function validateCourse(course) {
    const schema = {
        cname: Joi.string().required(),
        ccode: Joi.string().required(),
        hours: Joi.number().required()
    }
    return Joi.validate(course, schema);
}

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;