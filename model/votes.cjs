const { addVoteQuery } = require("../queries/votes.cjs");

const { queryPromise } = require("../tools/queryUtils.cjs");

const addVoteModel = async ({ userId, data }) => {
  try {
    const query = addVoteQuery({ userId, data });
    const result = await queryPromise(query.sql, query.values);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

module.exports = {
  addVoteModel,
};
