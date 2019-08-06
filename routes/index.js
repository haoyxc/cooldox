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
    .find({ collaborators: { $elemMatch: { _id: user._id } } })
    .exec((err, docs) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          sucess: true,
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

  router.get("/editor/:id", async (req, res) => {
    try {
      let doc = await Document.findOne({ id: req.params.id });
      res.json({ success: true, document: doc });
    } catch (e) {
      console.log(e);
    }
  });

  //   Document.findOne({ title: req.body.title })
  //     .then(doc => {
  //       console.log(doc);
  //       let collaborators = doc.collaborators;
  //       collaborators = [...collaborators, req.user._id];
  //       doc.collaborators = collaborators;
  //     })
  //     .catch(e => {
  //       console.log(e0);
  //     });
  //   doc.save((err, doc) => {
  //     if (err) {
  //       res.json({
  //         success: false,
  //         error: err
  //       });
  //     } else {
  //       res.json({
  //         success: true,
  //         document: doc
  //       });
  //     }
  //   });
});

module.exports = router;
