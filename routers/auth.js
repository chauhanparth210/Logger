const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Host = require("../models/host");
const router = express.Router();
const saltRound = 10;
require("dotenv").config();

const signInHost = (req, res) => {
  Host.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      console.log(queryError);
      return res.status(500).json({ message: "Database query error" });
    } else if (!user)
      return res.status(500).json({ message: "Host doesn't exist!..." });
    else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        console.log(err, "error");
        if (err) {
          return res.status(500).json("Authentication Failed!...");
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.SECRET_KEY,
            { expiresIn: "5h" }
          );
          res.json({
            message: "Successful Authentication",
            token
          });
        } else {
          return res.status(401).json({ message: "Password is worng!.." });
        }
      });
    }
  });
};

const registerHost = (req, res) => {
  Host.findOne({ email: req.body.email }).exec((queryError, user) => {
    if (queryError) {
      console.log(queryError);
      return res
        .status(500)
        .json({ message: "Database query error. Failed to create document." });
    } else if (!user) {
      bcrypt.genSalt(saltRound, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hashPassword) {
          const { name, email, phone } = req.body;
          const user = new Host({
            name,
            email,
            phone,
            password: hashPassword
          });
          user.save(error => {
            if (error)
              return res
                .status(500)
                .json({ message: "Failed to create new account for host!..." });
            else {
              res.status(201).json({ message: "New host created successful." });
            }
          });
        });
      });
    } else {
      res.status(500).json({ message: "Duplicate host found!...." });
    }
  });
};

router.post("/signin", signInHost);
router.post("/register", registerHost);

module.exports = router;
