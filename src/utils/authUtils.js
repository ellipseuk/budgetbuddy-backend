const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => await argon2.hash(password);
const verifyPassword = async (hash, password) => await argon2.verify(hash, password);
const generateToken = (user) => jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

module.exports = { hashPassword, verifyPassword, generateToken };