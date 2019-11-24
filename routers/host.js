const express = require("express");
const Host = require("../models/host");
const router = express.Router();
require("dotenv").config();

const registerHost = (req, res) => {
  Host.findOne({ email: req.body.email }).exec((queryError, user) => {
    if (queryError) {
      console.log(queryError);
      return res
        .status(500)
        .json({ message: "Database query error. Failed to create document." });
    } else if (!user) {
      const { name, email, phone } = req.body;
      const user = new Host({
        name,
        email,
        phone
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
    } else {
      res.status(500).json({ message: "Duplicate host found!...." });
    }
  });
};

const getVisitor = (req, res) => {
  Host.find({ email: req.body.email })
    .populate("visitor", ["name", "phone", "email", "checkIn", "checkOut"])
    .exec((queryError, visitorData) => {
      if (queryError) {
        console.log(queryError);
        return res
          .status(500)
          .json({ message: "Failed to query database!..." });
      }
      if (visitorData) {
        return res.status(201).json(visitorData);
      }
      res.status(404).json({ message: "Not found visitor!..." });
    });
};

router.get("/", getVisitor);
router.post("/register", registerHost);

module.exports = router;
