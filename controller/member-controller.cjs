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

  const letters = await fetchLetters(memberId);
  if (letters == -1) return res.status(500).json({ status: 500 });

  return res.status(200).json({ status: 200, data: letters });
};

const userController = {
  getUser,
  logInUser,
  checkLogIn,
  getLetters,
};

module.exports = userController;
