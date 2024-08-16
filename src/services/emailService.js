const nodemailer = require('nodemailer');
const crypto = require('crypto');

const tempUsers = new Map();

const sendConfirmationEmail = async (username, email, password) => {
    const token = crypto.randomBytes(32).toString('hex');
    const confirmationUrl = `${process.env.CONFIRMATION_URL}?token=${token}`;

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

module.exports = {
    sendConfirmationEmail,
    tempUsers
};