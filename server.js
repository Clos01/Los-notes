// creating port to have in localhost 

const PORT = 3000;
const express = require('express'); //require express pkg
const app = express();  //having express method into a variable
const fs = require('fs'); //requiring a fs pkg
const path = require('path'); //requiring path 

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');



//==============================================================================
// Gotta link to my assets!
app.use(express.static('public'))

//==============================================================================
// This sets up data parsing-- Express will interpret it/format data as JSON.
// This is required for API calls!
//==============================================================================
// Express url in code makes it understand what is being requested 
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

//==============================================================================
// 
// having the index html start with the start btn and the it should listen to when it is being clicked on 
//==============================================================================
app.get(`/`, function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))

});



app.use("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// app.get is routing to app/notes  sends the file to join from notes 
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/db/db.json"));
});

//saving notes to be config with id  (one note id =1 note 2 =id 2 )
app.get("/api/notes:id", function (req,res){
    let SavedNotes= JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf-8"));
    res.json(SavedNotes[Number(req.params.id)]);
});

//gathers 
app.get("*", function(req,res){
    res.sendFile(path.join(mainDir, "index.html"))
});
// saves the notes with json and fs 
app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

// const allNotes = require('./Los_Notes/Develop/Develop/db/db.json');
app.listen(PORT, e => console.log("Running"))
