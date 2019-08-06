const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Document = require("../models/Document");

// all routes after login
router.get("/portals", (req, res) => {
  let user = req.user;
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
module.exports = router;
