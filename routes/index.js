const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Document = require("../models/Document");

// all routes after login
router.get("/portals", (req, res) => {
  const user = req.user;

  Document.find().exec((err, docs) => {
    docs = docs.filter(doc => {
      return doc.collaborators.includes(user._id);
    });
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        documents: docs
      });
    }
  });
});

router.post("/newDocument", (req, res) => {
  console.log("req", req);
  let newDoc = new Document({
    title: req.body.title,
    content: "",
    collaborators: [req.user._id],
    password: req.body.password
  });
  newDoc
    .save()
    .then(document => res.json({ success: true, document: document }))
    .catch(e => res.json({ success: false, error: e }));
});

router.post("/addDocument", async (req, res) => {
  try {
    console.log("in wrong one");
    let doc = await Document.findOne({ title: req.body.title });
    const collabs = doc.collaborators;
    await Document.updateOne(
      { title: req.body.title },
      { collaborators: [...collabs, req.user.id] }
    );
    doc.collaborators = [...collabs, req.user.id];
    await doc.save();
    res.send(doc);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post("/addDocumentById", async (req, res) => {
  try {
    console.log("ID", req.body.id);
    console.log("pw", req.body.password);

    let doc = await Document.findById(req.body.id);
    console.log("doc", doc);
    if (doc.password === req.body.password) {
      const collabs = doc.collaborators;
      await Document.updateOne(
        { id: req.body.id },
        { collaborators: [...collabs, req.user.id] }
      );
      doc.collaborators = [...collabs, req.user.id];
      await doc.save();
      res.send(doc);
    } else {
      res.json({ success: false, error: "No document found with the id and password" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/editor/:id", async (req, res) => {
  try {
    let doc = await Document.findOneById(req.params.id);
    res.json({ success: true, document: doc });
  } catch (e) {
    res.json({ success: false, error: e });
    console.log(e);
  }
});

module.exports = router;
