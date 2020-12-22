const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const config = require('config');
const dburl = config.get("dburl");
const student = require('./routes/student.js');
const nopath = require('./middleware/nopath.js');

app.use(express.json());
app.use('/api/student', student);
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