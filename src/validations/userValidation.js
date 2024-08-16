const isUsernameValid = (username) => /^[a-z0-9_]+$/.test(username);
const isEmailValid = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isPasswordValid = (password) => password.length >= 8;

module.exports = {
    isUsernameValid,
    isEmailValid,
    isPasswordValid
};