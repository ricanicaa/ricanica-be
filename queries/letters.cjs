// 특정 id 편지 조회 쿼리
const getLetterQuery = (id) => {
  return {
    sql: `SELECT *
      FROM 
        letters
      WHERE 
        letter_id = ?;`,
    values: [id],
  };
};

// 편지 받는 사람 id 조회 쿼리
const getLetterMemberIdQuery = (userId, id) => {
  return {
    sql: `SELECT member_id
      FROM 
        letters
      WHERE member_id = ? AND letter_id = ?;`,
    values: [userId, id],
  };
};

// 편지 작성 쿼리
const addLetterQuery = (data) => {
  return {
    sql: `INSERT INTO letters (
        content, 
        nickname, 
        member_id, 
        icon_type
      ) VALUES (
        ?, ?, ?,  ?
      );`,
    values: [data.content, data.nickname, data.member_id, data.icon_type],
  };
};

const getLettersQuery = (id, offset, limit) => {
  return {
    sql: `
    SELECT * 
    FROM letters 
    WHERE member_id = ? 
    ORDER BY CREATED_AT DESC 
    LIMIT ? OFFSET ?;
  `,
    values: [id, limit, offset],
  };
};

const getLettersCountQuery = (id) => {
  return {
    sql: `
      SELECT COUNT(*) AS count 
      FROM letters 
      WHERE member_id = ?;
    `,
    values: [id],
  };
};

module.exports = {
  getLetterQuery,
  getLetterMemberIdQuery,
  addLetterQuery,
  getLettersQuery,
  getLettersCountQuery,
};
