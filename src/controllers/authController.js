const Users = require('../models/users');
const { hashPassword, verifyPassword, generateToken } = require('../utils/authUtils');
const { isUsernameValid, isEmailValid, isPasswordValid } = require('../validations/userValidation');
const verifyEmailDomain = require('../services/dnsService');
const { sendConfirmationEmail, tempUsers } = require('../services/emailService');

const validateUserInput = (username, email, password) => 
    isUsernameValid(username) && isEmailValid(email) && isPasswordValid(password);

const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username.toLowerCase();

        if (!validateUserInput(username, email, password)) {
            return res.status(400).json({ error: 'Invalid input data.' });
        }

        if (await Users.findOne({ where: { email } })) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        if (!await verifyEmailDomain(email)) {
            return res.status(400).json({ error: 'Invalid email domain.' });
        }

        await sendConfirmationEmail(username, email, password);
        res.status(200).json({ message: 'Confirmation email sent.' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const confirmEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const userData = tempUsers.get(token);
        if (!userData) return res.status(400).json({ error: 'Invalid or expired token' });

        const { username, email, password } = userData;
        const newUser = await Users.create({ username, email, password: await hashPassword(password) });

        tempUsers.delete(token);
        res.status(201).json({ message: 'Email confirmed, user created.', user: newUser });
    } catch (error) {
        console.error('Error confirming email:', error);
        res.status(500).json({ error: 'Error confirming email' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user || !await verifyPassword(user.password, password)) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful', token: generateToken(user) });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        await user.update({ password: await hashPassword(newPassword) });
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Server error during password reset.' });
    }
};

module.exports = { createUser, confirmEmail, loginUser, resetPassword };