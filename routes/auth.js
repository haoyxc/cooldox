const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

module.exports = function(passport, hash) {
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/login/success",
      failureRedirect: "/login/failure"
      // failureFlash: true
    })
  );
  router.get("/login/failure", function(req, res) {
    res.status(401).json({
      success: false,
      error: "Incorrect username or password."
    });
  });

  router.get("/login/success", function(req, res) {
    const { username, _id } = req.user;
    res.json({
      success: true,
      user: { username, _id }
    });
  });
  // router.post("/login", passport.authenticate("local"), function(req, res) {
  //   console.log("user is", req.user);
  //   res.json({
  //     success: true,
  //     error: ""
  //   });
  // });

  // GET Logout page
  router.get("/logout", function(req, res) {
    req.logout();
    res.json({
      success: true,
      error: ""
    });
  });

  router.use((req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: "Not authorized"
      });
      return;
    }
    next();
  });

  return router;
};
