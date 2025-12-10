// utils/validators.js
const isEmpty = (value) => {
  return !value || value.trim() === '';
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  return password && password.length >= 6;
};

module.exports = { isEmpty, isValidEmail, isStrongPassword };