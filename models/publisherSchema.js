const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const publisherSchema = new mongoose.Schema(
  {
    publisher_name: {
        type: String,
        default:""
    },
    address:{
      type: String,
      default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publisher", publisherSchema);
