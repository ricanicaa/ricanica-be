const {
  checkUserModel,
  logInUserModel,
  fetchLetters,
} = require("../model/members.cjs");

// 세션에 유저가 있는지 없는지 확인
const checkLogIn = (req, res) => {
  if (req.session.user) return res.status(200);
  return res.status(401);
};

// member_id로 유저 정보 조회
const getUser = async (req, res) => {
  const memberId = req.session.user.member_id;
  if (!memberId) return res.status(400).json({ status: 400 });

  const user = await checkUserModel(memberId);
  if (!user) return res.status(404).json({ status: 404 });

  return res.status(200);
};

// 유저 로그인 english_name으로
const logInUser = async (req, res) => {
  const { english_name, password } = req.body;
  if (!english_name) return res.status(400).json({ status: 400 });

  const member = await logInUserModel(english_name, password);
  if (!member) return res.status(404).json({ status: 404 });
  if (member === -1) return res.status(500).json({ status: 500 });

  req.session.user = member;

  //req.session -> {user: {member_id: 1, name: "", }}
  return res.status(200).json({ data: member.member_id });
};

const getLetters = async (req, res) => {
  const memberId = req.session.user.member_id;
  if (!memberId) return res.status(400).json({ status: 400 });

  const { cursor } = req.query;
  const limit = 10;

  try {
    const letters = await fetchLetters(memberId, cursor, limit + 1);
    if (letters === -1) return res.status(500).json({ status: 500 });

    const hasNext = letters.length > limit;
    const data = hasNext ? letters.slice(0, limit) : letters;
    console.log(hasNext);
    const nextCursor = hasNext ? data[data.length - 1].letter_id : null;
    console.log(nextCursor);
    return res.status(200).json({
      status: 200,
      data,
      nextCursor,
      hasNext,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

const userController = {
  getUser,
  logInUser,
  checkLogIn,
  getLetters,
};

module.exports = userController;
