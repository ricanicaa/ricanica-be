const express = require("express");
const { addVote } = require("../controller/vote-controller.cjs");
const { getAuthUser } = require("../middleware/authUser.cjs");

const router = express.Router();

//댓글 작성
router.post("", getAuthUser, addVote);

module.exports = router;
