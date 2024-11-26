const express = require("express");
const { addLetter, getLetter } = require("../controller/letter-controller.cjs");
const { getAuthUser } = require("../middleware/authUser.cjs");

const router = express.Router();

// 편지지 상세 - ok
router.get("/:id", getAuthUser, getLetter);

//편지 작성 --OK
router.post("", getAuthUser, addLetter);

module.exports = router;
