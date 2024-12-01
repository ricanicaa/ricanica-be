const {
  getLetterModel,
  addLetterModel,
  checkLetterOwnerModel,
  getLettersModel,
} = require("../model/letters.cjs");

//--------------------------------------------------------
// const getLetters = async (req, res) => {
//   const posts = await getPostsModel();
//   if (posts === -1)
//     return res
//       .status(500)
//       .json({ status: 500, message: "Internal server error", data: null });

//   return res.status(200).json({ status: 200, message: null, data: posts });
// };

const getLetter = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400);
  const userId = Number(req.session.user.member_id);

  // 본인에게 씌여진 건지 권한 검사
  const checkAuth = await checkLetterOwnerModel(userId, id);
  if (!checkAuth) {
    return res.status(403).json({ status: 403 });
  } else if (checkAuth === -1) {
    return res.status(404).json({ status: 404 });
  }
  const letter = await getLetterModel(id);

  if (letter === -1) return res.status(500).json({ status: 500 });
  if (letter.length === 0) return res.status(404).json({ status: 404 });

  return res.status(200).json({ data: letter });
};

const addLetter = async (req, res) => {
  const userId = Number(req.session.user.member_id);
  const { content, nickname, member_id, icon_type } = req.body;

  if (!userId) return res.status(401).json({ status: 401 });
  if (!nickname || !content || !member_id || !icon_type)
    return res.status(400).json({ status: 400 });
  if (userId == member_id)
    return res.status(400).json({ status: 400, message: "cannot_write_to_me" });

  const letterId = await addLetterModel({
    content,
    nickname,
    member_id,
    icon_type,
  });

  if (!letterId || letterId === -1)
    return res.status(500).json({ status: 500 });

  return res.status(201).json({
    data: { letter_id: letterId },
  });
};

const getLetters = async (req, res) => {
  const memberId = req.session.user.member_id;
  if (!memberId) return res.status(400).json({ status: 400 });

  const { currentPage = 1 } = req.query;
  const limit = 10;

  try {
    const offset = (currentPage - 1) * limit;

    const letters = await getLettersModel(memberId, offset, limit + 1);
    if (letters === -1) return res.status(500).json({ status: 500 });

    const hasNextPage = letters.length > limit;
    const data = hasNextPage ? letters.slice(0, limit) : letters;

    return res.status(200).json({
      status: 200,
      data,
      currentPage: parseInt(currentPage, 10),
      hasNextPage,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  getLetters,
  getLetter,
  addLetter,
};
