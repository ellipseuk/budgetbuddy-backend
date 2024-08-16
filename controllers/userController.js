require('dotenv').config();
const argon2 = require('argon2');
const dns = require('dns');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Users = require('../models/Users');

const tempUsers = new Map();

// Helper functions for validation
const isUsernameValid = (username) => /^[a-z0-9_]+$/.test(username);
const isEmailValid = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isPasswordValid = (password) => password.length >= 8;
const checkIfExists = async (field, value) => await Users.findOne({ where: { [field]: value }});

// Check if email's domain has MX records
const verifyEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

// Send confirmation email
const sendConfirmationEmail = async (username, email, password) => {
    const token = crypto.randomBytes(32).toString('hex');
    const confirmationUrl = `${process.env.CONFIRMATION_URL}?token=${token}`;

    // Store user data in temporary storage
    tempUsers.set(token, { username, email, password });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirm your email',
        text: `Please confirm your email by clicking on the following link: ${confirmationUrl}`
    };

    await transporter.sendMail(mailOptions);
};

// Confirm email and create user
const confirmEmail = async (req, res) => {
    const { token } = req.query;

    const userData = tempUsers.get(token);
    if (!userData) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const { username, email, password } = userData;

    const emailDomainValid = await verifyEmailDomain(email);
    if (!emailDomainValid) {
        return res.status(400).json({ error: 'Email domain is invalid or does not exist.' });
    }

    const hashedPassword = await argon2.hash(password);
    const user = await Users.create({ username, email, password: hashedPassword });

    tempUsers.delete(token);

    res.status(201).json({ message: 'Email confirmed and user created successfully.', user });
};

// Register user and send confirmation email
const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        username = username.toLowerCase();

        if (!isUsernameValid(username)) {
            return res.status(400).json({ error: 'Invalid username format.' });
        }

        if (!isEmailValid(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        if (!isPasswordValid(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
        }

        if (await checkIfExists('username', username)) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        if (await checkIfExists('email', email)) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const emailDomainValid = await verifyEmailDomain(email);
        if (!emailDomainValid) {
            return res.status(400).json({ error: 'Email domain is invalid or does not exist.' });
        }

        // Send confirmation email and wait for confirmation
        await sendConfirmationEmail(username, email, password);
        res.status(200).json({ message: 'Confirmation email sent. Please confirm your email to complete registration.' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

module.exports = {
    createUser,
    confirmEmail,
    getUsers,
};