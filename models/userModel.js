const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    // required: true,
    type: String,
  },

  email: {
    type: String,
    // required: true,
    unique: true,
  },

  password: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    unique: true,
    // required: true,
  },
  isSignedUp: {
    type: Boolean,
    default: false,
  },
  token:{
      type:String,
      default:""
  }
});

module.exports = mongoose.model("User", userSchema);
