const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  name: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;