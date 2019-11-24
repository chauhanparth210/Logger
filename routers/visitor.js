const express = require("express");
const router = express.Router();

const Visitor = require("../models/visitor");
const Host = require("../models/host");
const { sendEmailToHost, sendEmailToVisitor } = require("../utils/sendEmail");
const { sendSMS } = require("../utils/sendSMS");

const getVisitor = (req, res) => {
  Visitor.find().exec((queryError, visitorData) => {
    if (queryError) {
      console.log(queryError);
      return res.status(500).json({ message: "Failed to query database!..." });
    }
    if (visitorData) {
      return res.status(201).json(visitorData);
    }
    res.status(404).json({ message: "No visitor found!..." });
  });
};

const entryVisitor = (req, res) => {
  const { name, phone, email, hostName } = req.body;
  const visitor = new Visitor({
    name,
    phone: parseInt(phone),
    email
  });
  visitor.save(err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to Entry visitor!..." });
    } else {
      Host.findOneAndUpdate(
        { name: hostName },
        {
          $push: { visitor: `${visitor._id}` }
        }
      )
        .select(["email", "phone"])
        .then(hostData => {
          sendEmailToHost({
            name,
            email,
            phone,
            hostEmail: hostData.email
          });
          sendSMS({ name, email, phone, hostPhone: hostData.phone });
          res.status(201).json({ message: `${name} thank you.` });
        })
        .catch(err => res.status(500).json(err));
    }
  });
};

const checkoutVisitor = (req, res) => {
  const { email } = req.body;
  Visitor.find({ email, isCheckout: false })
    .sort({ checkIn: -1 })
    .limit(1)
    .exec((err, result) => {
      if (err) {
        return res.status(404).json({ message: "Not found visitor!..." });
      } else if (result) {
        const { isCheckout, name } = result;
        if (isCheckout) {
          return res.status(201).json({ message: `${name} was checked out` });
        } else {
          Visitor.findOneAndUpdate(
            { email: email, isCheckout: false },
            {
              isCheckout: true,
              checkOut: Date.now()
            },
            { new: true }
          ).exec((queryError, data) => {
            if (queryError) {
              console.log(queryError);
              return res
                .status(500)
                .json({ message: "Failed to query database!..." });
            } else {
              const { name, email, phone, checkIn, checkOut } = data;
              sendEmailToVisitor({ name, email, phone, checkIn, checkOut });
              return res.status(201).json(data);
            }
          });
        }
      }
    });
};

router.get("/", getVisitor);
router.post("/", entryVisitor);
router.put("/checkout", checkoutVisitor);

module.exports = router;
