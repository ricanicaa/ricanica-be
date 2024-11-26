const express = require("express");
const {
  getUser,
  getLetters,
  logInUser,
  checkLogIn,
} = require("../controller/member-controller.cjs");
const { getAuthUser } = require("../middleware/authUser.cjs");

const router = express.Router();

//로그인  -- ok
router.post("/login", logInUser);

// 편지 목록 확인 -- ok
router.get("/letters", getAuthUser, getLetters);

module.exports = router;
