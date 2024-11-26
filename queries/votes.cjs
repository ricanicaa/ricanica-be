const addVoteQuery = (queryData) => {
  return {
    sql: `INSERT INTO votes (
        member_id,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      );`,
    values: [
      queryData.userId,
      queryData.data.question1,
      queryData.data.question2,
      queryData.data.question3,
      queryData.data.question4,
      queryData.data.question5,
      queryData.data.question6,
      queryData.data.question7,
      queryData.data.question8,
      queryData.data.question9,
      queryData.data.question10,
    ],
  };
};

module.exports = {
  addVoteQuery,
};
