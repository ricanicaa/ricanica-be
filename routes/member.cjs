const express = require("express");
const { logInUser } = require("../controller/member-controller.cjs");

const router = express.Router();

//로그인  -- ok
router.post("/login", logInUser);

module.exports = router;
