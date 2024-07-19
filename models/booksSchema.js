const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const booksSchema = new mongoose.Schema(
  {
    book_name: {
        type: String,
    },
    author: {
        type: String,
    },
    availability_status:{
        type: Boolean,
        default: true,
    },
    publisher_details:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", booksSchema);
