const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dept: { type: String, required: true },
  batch: { type: String, required: true },
  // course: { type: String, required: true },
  semester: { type: String, required: true },
  password: { type: String, required: true },

});

module.exports = mongoose.models.users || mongoose.model('users', userSchema);
