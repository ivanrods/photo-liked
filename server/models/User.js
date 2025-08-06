const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  avatar: String,
  likes: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("User", userSchema);
