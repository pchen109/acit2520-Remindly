const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  const user = userModel.findOne(email);
  return user && isUserValid(user, password) ? user : null;
};

const getUserById = (id) => {
  const user = userModel.findById(id);
  return user || null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
