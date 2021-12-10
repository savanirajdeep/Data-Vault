const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  blockchain: {
    type: String,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("passwords", UserSchema);
