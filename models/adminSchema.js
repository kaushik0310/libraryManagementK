const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    contactNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: String,
      default:true
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Admin", adminSchema);
