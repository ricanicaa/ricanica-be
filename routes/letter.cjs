const express = require("express");
const {
  addLetter,
  getLetter,
  getLetters,
} = require("../controller/letter-controller.cjs");
const { getAuthUser } = require("../middleware/authUser.cjs");

const router = express.Router();

// 편지 목록 확인 -- ok
router.get("", getAuthUser, getLetters);

//편지 작성 --OK
router.post("", getAuthUser, addLetter);

// 편지지 상세 - ok
// router.get("/:id", getAuthUser, getLetter);

module.exports = router;
