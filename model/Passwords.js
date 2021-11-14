const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  website: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("passwords", UserSchema);
