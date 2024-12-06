const { checkUserModel, logInUserModel } = require("../model/members.cjs");

const checkLogIn = (req, res) => {
  if (req.session.user) return res.status(200).json({ status: 200 });
  return res.status(401).json({ status: 401 });
};

const getUser = async (req, res) => {
  const memberId = req.session.user.member_id;
  if (!memberId) return res.status(400).json({ status: 400 });

  const user = await checkUserModel(memberId);
  if (!user) return res.status(404).json({ status: 404 });

  return res.status(200);
};

const logInUser = async (req, res) => {
  const { english_name, password } = req.body;
  if (!english_name) return res.status(400).json({ status: 400 });

  const member = await logInUserModel(english_name, password);
  if (!member) return res.status(404).json({ status: 404 });
  if (member === -1) return res.status(500).json({ status: 500 });

  req.session.user = member;
  return res.status(200).json({ data: member.member_id });
};

const userController = {
  getUser,
  logInUser,
  checkLogIn,
};

module.exports = userController;
