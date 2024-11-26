const {
  getLetterQuery,
  addLetterQuery,
  getLetterMemberIdQuery,
} = require("../queries/letters.cjs");

const { queryPromise } = require("../tools/queryUtils.cjs");

const getLetterModel = async (id) => {
  try {
    const query = getLetterQuery(id);
    return await queryPromise(query.sql, query.values);
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const checkLetterOwnerModel = async (userId, id) => {
  try {
    const query = getLetterMemberIdQuery(id);
    const letter = await queryPromise(query.sql, query.values);
    return letter === userId;
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

module.exports = {
  getLetterModel,
  checkLetterOwnerModel,
  addLetterModel,
};
