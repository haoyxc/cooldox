const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Document = require("../models/Document");

// all routes after login
router.get("/portals", (req, res) => {
  let user = req.user;
});

module.exports = router;
