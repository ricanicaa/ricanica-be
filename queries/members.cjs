const getUserQuery = (id) => {
  return {
    sql: `SELECT * 
      FROM members 
      WHERE 
        member_id = ?;`,
    values: [id],
  };
};

const getEnglishNameQuery = (english_name) => {
  return {
    sql: `SELECT * 
      FROM members 
      WHERE 
        english_name = ?;`,
    values: [english_name],
  };
};

const getUserLettersQuery = (id, cursor, limit) => {
  const baseQuery = `
    SELECT * 
    FROM letters 
    WHERE member_id = ? 
      ${cursor ? "AND letter_id < ?" : ""}
    ORDER BY CREATED_AT DESC 
    LIMIT ?;
  `;

  const values = cursor ? [id, cursor, limit] : [id, limit];

  return { sql: baseQuery, values };
};

module.exports = {
  getUserQuery,
  getEnglishNameQuery,
  getUserLettersQuery,
};
