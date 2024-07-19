const userModel = require("../../models/userSchema");
const booksModel = require("../../models/booksSchema");
const transactionModel = require("../../models/transactionSchema");
const generateJWTToken = require("../../utils/generateJWT");

module.exports = {
  userSignup: async (req, res) => {
    const { username, name, email, contactNumber } = req.body;
    if (!username || !name || !email || !contactNumber) {
      throw new Error("please provide all required fields");
    }
    try {
      const checkUsername = await userModel.findOne({ username });
      if (checkUsername) {
        throw new Error("username already exists");
      }
      const user = await userModel.create({
        username,
        name,
        email,
        contactNumber,
      });
      res.status(201).send({
        success: true,
        message: "user created successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { username, contactNumber } = req.body;

      if (!username || !contactNumber) {
        throw new Error("please provide email and contactNumber");
      }

      const user = await userModel.findOne({ username });
      if (!user) {
        throw new Error("user not found");
      }

      if (user && contactNumber == user.contactNumber) {
        res.status(201).send({
          success: true,
          message: "user logged in successfully",
          user,
          token: generateJWTToken(user._id),
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error: error.message,
        stackTrace: error.stack,
      });
    }
  },
  viewCatalog: async (req, res) => {
    try {
      const book = await booksModel.find(
        {},
        { _id: 0, book_name: 1, author: 1, availability_status: 1 }
      );
      console.log("book", book);
      if (!book) {
        throw new Error("book not found in inventory");
      }
      res.status(200).send({
        success: true,
        message: "Library catalog fetched successfully",
        book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  transactionHistory: async (req, res) => {
    const user_id = req.user;
    console.log("user_id: ", user_id);
    try {
      const user = await userModel.findById({ _id: user_id });
      console.log("user", user);
      const transactions = await transactionModel
        .find({ user_details: user_id }, { _id: 0, createdAt: 0, updatedAt: 0 })
        .populate({ path: "user_details", select: "username email " })
        .populate({
          path: "book_details",
          select: "book_name author publisher_details",
          populate: {
            path: "publisher_details",
            select: "publisher_name address",
          },
        });

      if (!transactions) {
        throw new Error("no transaction found for this user");
      }
      res.status(200).send({
        success: true,
        message: "user transaction history fetched successfully",
        transactions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
