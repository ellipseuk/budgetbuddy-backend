import { hash, verify } from 'argon2';
import { Schema, model } from 'mongoose';

// Define the user schema
const userSchema = new Schema({
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
    this.password = await hash(this.password);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await verify(this.password, candidatePassword);
};

const User = model('User', userSchema);

export default User;