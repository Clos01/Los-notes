
const PORT = 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Express url in code makes it understand what is being requested 
app.use(express.urlencoded({
    extended: true
}))


app.use(express.static('public'))
app.use(express.json());
app.use(`/api`,apiRoutes);
app.use(`/html`,htmlRoutes);

const allNotes = require('./Los_Notes/Develop/db/db.json');
app.listen(PORT, e => console.log("Running"))
