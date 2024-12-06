const express = require("express");
const {
  logInUser,
  checkLogIn,
} = require("../controller/member-controller.cjs");

const router = express.Router();

//로그인  -- ok
router.post("/login", logInUser);

router.get("/info", checkLogIn);

module.exports = router;
