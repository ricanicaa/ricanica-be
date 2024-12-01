const {
  getLetterQuery,
  getLettersQuery,
  addLetterQuery,
  getLetterMemberIdQuery,
  getLettersCountQuery,
} = require("../queries/letters.cjs");

const { queryPromise } = require("../tools/queryUtils.cjs");

const getLetterModel = async (id) => {
  try {
    const query = getLetterQuery(id);
    const result = await queryPromise(query.sql, query.values);
    return result;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const checkLetterOwnerModel = async (userId, id) => {
  try {
    const query = getLetterMemberIdQuery(userId, id);
    const letter = await queryPromise(query.sql, query.values);
    if (letter.length > 0 && letter[0].member_id === userId) {
      return true;
    } else if (letter.length > 0 && letter[0].member_id !== userId) {
      return false;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const addLetterModel = async (data) => {
  try {
    const query = addLetterQuery(data);
    const result = await queryPromise(query.sql, query.values);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const getLettersModel = async (memberId, offset, limit) => {
  try {
    const query = getLettersQuery(memberId, offset, limit);
    const result = await queryPromise(query.sql, query.values);
    return result.length !== 0 ? result : [];
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const getTotalLettersCount = async (memberId) => {
  try {
    const query = getLettersCountQuery(memberId);
    const result = await queryPromise(query.sql, query.values);
    return result[0].count;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

module.exports = {
  getLetterModel,
  checkLetterOwnerModel,
  addLetterModel,
  getLettersModel,
  getTotalLettersCount,
};
