const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Document = require("../models/Document");

// all routes after login
router.get("/portals/", (req, res) => {
  const user = req.user;
  Document.find()
    .populate("User")
    .find({collaborators: {$elemMatch: {_id: user._id}}})
    .exec((err,docs) => {
        if(err){
            res.json({
                success: false,
                error: err
            })
        }
        else {
            res.json({
                sucess: true,
                documents: docs
            })
        }
    })
});

router.post("/addDocument", (req, res) => {
  console.log(req);
  res.send("hello");
  console.log(req);
  let newDoc = new Document({
    title: req.title,
    content: "",
    collaborators: [req.user._id]
  });
  newDoc
    .save()
    .then(document => res.send(document))
    .catch(e => res.send(e));
});

router.post("/newDocument", (req,res) => {
    const doc = new Document({
        title: req.body.title,
        collaborators: [req.user._id] 
    })
    doc.save((err, doc) => {
        if(err){
            res.json({
                success: false,
                error: err
            })
        }
        else {
            res.json({
                success: true,
                document: doc
            })
        }
    })
})


module.exports = router;
