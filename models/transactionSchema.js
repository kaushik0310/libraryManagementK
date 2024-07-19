const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const transactionsSchema = new mongoose.Schema(
  {
    user_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    book_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    issue_date: {
      type: Date,
      default: "",
      required: true,
      default: "",
    },
    due_date: {
      type: Date,
      required: true,
      required: true,
      default: "",
    },
    return_date:{
      type: Date,
      default: "",
    },
    transaction_type: {
      type: String,
      enum: ["borrow", "return"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", transactionsSchema);
