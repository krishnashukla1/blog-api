// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function () { // Hash password before saving
  if (!this.isModified('password')) return; // Check if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash password with 10 rounds
});

module.exports = mongoose.model('User', UserSchema);
