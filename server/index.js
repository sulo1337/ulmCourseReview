const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const config = require('config');
const dburl = config.get("dburl");
const student = require('./routes/student.js');
const course = require('./routes/course.js');
const professor = require('./routes/professor.js');
const review = require('./routes/review.js');
const nopath = require('./middleware/nopath.js');
const morgan = require('morgan');
const Joi = require('joi');
const cors = require('cors');
Joi.objectId = require('joi-objectid')(Joi);

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        let formattedError = {
            status: err.statusCode,
            message: err.message
        }
        return res.status(err.statusCode).json(formattedError); // Bad request
    }
    next();
});
app.use(morgan('combined'));
app.use('/api/student', student);
app.use('/api/course', course);
app.use('/api/professor', professor);
app.use('/api/review', review);
app.use(nopath);

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB at " + dburl);
    })
    .catch(err => {
        console.log("Could not connect to MongoDB at " + dburl);
        console.log("Error: " + err.message);
    })

app.listen(port, () => console.log("Listening on port: " + port));