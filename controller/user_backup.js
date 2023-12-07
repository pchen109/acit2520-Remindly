// Functions for user authentication and retrieval based on email, password, and user ID.

const userModel = require("../models/userModel").userModel;

// Verifies user credentials by email and password
const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

// Retrieves a user by their ID
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

// Check admin

// Return true if password matched; otherwise, false
function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};