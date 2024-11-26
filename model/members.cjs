const { queryPromise } = require("../tools/queryUtils.cjs");

const {
  getUserQuery,
  getUserLettersQuery,
  getEnglishNameQuery,
} = require("../queries/members.cjs");

const checkLogInModel = async (english_name) => {
  const query = getEnglishNameQuery(english_name);
  try {
    const result = await queryPromise(query.sql, query.values);
    return result.length !== 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

//유저 로그인 로직 -> 유저 아이디 반환
const logInUserModel = async (english_name, password) => {
  try {
    const user = await checkLogInModel(english_name);
    if (!user) return false;
    if (user === -1) return -1;
    return user.password == password ? user : false;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

//userId 유효성 조회 로직
const checkUserIdModel = async (userId) => {
  try {
    const query = getUserQuery(userId);
    const result = await queryPromise(query.sql, query.values);
    return result.length !== 0;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const checkUserModel = async (memberId) => {
  try {
    const query = getUserQuery(memberId);
    const result = await queryPromise(query.sql, query.values);
    return result.length !== 0 ? result[0] : null;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const fetchLetters = async (memberId) => {
  try {
    const query = getUserLettersQuery(memberId);
    const result = await queryPromise(query.sql, query.values);
    return result.length !== 0 ? result : null;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

module.exports = {
  checkUserIdModel,
  checkUserModel,
  logInUserModel,
  fetchLetters,
};
