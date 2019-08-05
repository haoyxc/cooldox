const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Document = models.Document;

// all routes after login
router.get("/portals", (req, res) => {
  let user = req.user;
});

module.exports = router;
