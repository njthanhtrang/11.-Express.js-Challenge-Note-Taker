const router = require("express").Router();
let data = require("../../db/db.json");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
  console.log({data});
  res.json(data);
});

// get one specific note
// req.body.id, readfile db.json, find entry that matches that id
router.delete("/notes/:id", (req, res) => {
    data = data.filter(el => el.id !== req.params.id);
    fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(data), function(err) {
        if (err) {
            res.status(404).json({ error: err });
        }
        res.json(data);
    });
});

//   create new UUID, take note out of req.body, apply UUID, save to db.json
router.post("/notes", (req, res) => {
    const newNote = {...req.body, id: uuidv4()};
    console.log(newNote);
    console.log(req.body);
    data.unshift(newNote);
    // joins relative to absolute path
    fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(data), function(err) {
        if (err) {
            res.status(404).json({ error: err });
        }
        res.json(data);
    });
});

module.exports = router;
