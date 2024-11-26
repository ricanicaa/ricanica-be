const { addVoteModel } = require("../model/votes.cjs");

const addVote = async (req, res) => {
  const userId = Number(req.session.user.member_id);

  if (!userId) return res.status(401).json({ status: 401 });
  const requiredFields = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
    "question9",
    "question10",
  ];

  const missingFields = requiredFields.filter((field) => !(field in req.body));
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 400,
    });
  }
  const voteId = await addVoteModel({ userId, data: req.body });
  if (voteId === -1) return res.status(500).json({ status: 500 });
  return res.status(201).json({ status: 201, data: voteId });
};

module.exports = {
  addVote,
};
