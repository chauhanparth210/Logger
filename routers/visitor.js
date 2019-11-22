const express = require("express");
const router = express.Router();

const signInHost = (req, res) => {};
const registerHost = (req, res) => {};

router.post("/signin", signInHost);
router.post("/register", registerHost);

module.exports = router;
