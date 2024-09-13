const argon2 = require('argon2');
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true,
    lovercase: true,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
  },
}, {
  timestamps: true,
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;