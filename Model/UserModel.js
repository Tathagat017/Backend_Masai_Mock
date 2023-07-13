const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  email: { type: String, requied: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", Schema);

module.exports = { UserModel };
