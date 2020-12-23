const mongoose = require('mongoose');
const Joi = require('joi');

const professorSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    middle: {
        type: String
    }
});

function validateProfessor(professor) {
    const schema = {
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        middle: Joi.string()
    }
    return Joi.validate(professor, schema);
}

const Professor = mongoose.model('Professor', professorSchema);

module.exports.Professor = Professor;
module.exports.validate = validateProfessor;