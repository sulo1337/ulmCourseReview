const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const studentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    middle: {
        type: String,
    },
    password: {
        type: String,
    }
});

studentSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email }, 'jwtKey');
};

function validateStudent(student) {
    const schema = {
        email: Joi.string().email().min(17).max(50).required(),
        fname: Joi.string().max(50).required(),
        lname: Joi.string().max(50).required(),
        middle: Joi.string().max(50)
    }
    return Joi.validate(student, schema);
}

const Student = mongoose.model('Student', studentSchema);

module.exports.Student = Student;
module.exports.validate = validateStudent;