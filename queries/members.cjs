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

const getUserLettersQuery = (id) => {
  return {
    sql: `SELECT * 
      FROM letters 
      WHERE 
        member_id = ?;`,
    values: [id],
  };
};

module.exports = {
  getUserQuery,
  getEnglishNameQuery,
  getUserLettersQuery,
};
