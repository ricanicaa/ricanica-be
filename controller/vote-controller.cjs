const { addVoteModel } = require("../model/votes.cjs");

const addVote = async (req, res) => {
  const userId = Number(req.session.user.member_id);

  if (!userId) return res.status(401);

  const voteId = await addVoteModel({ userId, data: req.body });
  if (voteId === -1) return res.status(500);
  return res.status(201).json({ data: voteId });
};

module.exports = {
  addVote,
};
