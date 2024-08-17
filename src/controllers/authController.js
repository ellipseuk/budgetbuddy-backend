const Users = require('../models/users');
const { hashPassword, verifyPassword, generateToken } = require('../utils/authUtils');
const { isUsernameValid, isEmailValid, isPasswordValid } = require('../validations/userValidation');
const verifyEmailDomain = require('../services/dnsService');
const { sendConfirmationEmail, tempUsers } = require('../services/emailService');

const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        username = username.toLowerCase();

        if (!isUsernameValid(username) || !isEmailValid(email) || !isPasswordValid(password)) {
            return res.status(400).json({ error: 'Invalid input data.' });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const emailDomainValid = await verifyEmailDomain(email);
        if (!emailDomainValid) {
            return res.status(400).json({ error: 'Email domain is invalid or does not exist.' });
        }

        await sendConfirmationEmail(username, email, password);

        res.status(200).json({ message: 'Confirmation email sent. Please confirm your email to complete registration.' });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const confirmEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const userData = tempUsers.get(token);
        if (!userData) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const { username, email, password } = userData;

        const hashedPassword = await hashPassword(password);
        const newUser = await Users.create({ username, email, password: hashedPassword });

        tempUsers.delete(token);

        res.status(201).json({ message: 'Email confirmed and user created successfully.', user: newUser });
    } catch (error) {
        console.error('Error confirming email:', error.message);
        res.status(500).json({ error: 'Error confirming email' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const validPassword = await verifyPassword(user.password, password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await user.update({ password: hashedPassword });

        res.status(200).json({ message: 'Password reset successful.' });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Server error during password reset.' });
    }
};

module.exports = { createUser, confirmEmail, loginUser, resetPassword };