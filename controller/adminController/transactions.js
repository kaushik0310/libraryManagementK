const transactionModel = require("../../models/transactionSchema");
const booksModel = require("../../models/booksSchema");
const userModel = require("../../models/userSchema");

module.exports = {
  issueBookById: async (req, res) => {
    const { book_id, username, transaction_type } = req.body;
    if (!book_id || !username || !transaction_type) {
      throw new Error("please provide book_id username and transaction_type");
    }
    try {
      const book = await booksModel.findById({ _id: book_id });
      console.log("book", book);
      if (!book) {
        throw new Error("book not found in inventory");
      }
      if (book.availability_status === false) {
        throw new Error("book already issued");
      }
      const user = await userModel.findOne({ username });
      console.log("user", user);
      if (!user) {
        throw new Error("user not found");
      }
      const newTransaction = await transactionModel.create({
        user_details: user._id,
        book_details: book_id,
        issue_date: Date.now(),
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        transaction_type,
      });
      if (!newTransaction) {
        throw new Error("transaction creation failed");
      }
      book.availability_status = false;
      book.issue_date = Date.now();
      await book.save();

      res.status(200).send({
        success: true,
        message: "book issued successfully",
        newTransaction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  // issueBookByName: async (req, res) => {

  //   try {
  //      const { book_name, author, username, transaction_type } = req.body;
  //      if (!book_name || !author || !username || !transaction_type) {
  //        throw new Error("please provide all required fields");
  //      }
  //     const book = await booksModel.findOne({ book_name, author });
  //     console.log("book", book);
  //     if (!book) {
  //       throw new Error("book not found in inventory");
  //     }
  //     if (book.availability_status === false) {
  //       throw new Error("book already issued");
  //     }
  //     const book_id = book._id;
  //     const user = await userModel.findOne({ username });
  //     console.log("user", user);
  //     if (!user) {
  //       throw new Error("user not found");
  //     }
  //     const newTransaction = await transactionModel.create({
  //       user_details: user._id,
  //       book_details: book_id,
  //       issue_date: Date.now(),
  //       due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  //       transaction_type,
  //     });
  //     if (!newTransaction) {
  //       throw new Error("transaction creation failed");
  //     }
  //     book.availability_status = false;
  //     book.issue_date = Date.now();
  //     await book.save();

  //     res.status(200).send({
  //       success: true,
  //       message: "book issued successfully",
  //       newTransaction,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // },
  returnBookById: async (req, res) => {
    const { book_id, username, transaction_type } = req.body;
    if (!book_id || !username || !transaction_type) {
      throw new Error("please provide book_id username and transaction_type");
    }
    try {
      const book = await booksModel.findById({ _id: book_id });
      console.log("book", book);
      if (!book) {
        throw new Error("incorrect book id");
      }
      const user = await userModel.findOne({ username });
      console.log("user", user);
      if (!user) {
        throw new Error("user not found");
      }
      const user_id = user.id;
      const lastTransaction = await transactionModel.findOne({
        user_details: user_id,
        book_details: book_id,
      });
      if (!lastTransaction) {
        throw new Error("no transaction found for this user and book");
      }
      const checkReturn = await transactionModel.findOne({
        user_details: user_id,
        book_details: book_id,
        transaction_type: "return",
      });
      if (checkReturn) {
        throw new Error("book already returned");
      }

      const newTransaction = await transactionModel.create({
        user_details: user._id,
        book_details: book_id,
        issue_date: lastTransaction.issue_date,
        due_date: lastTransaction.due_date,
        return_date: Date.now(),
        transaction_type,
      });
      if (!newTransaction) {
        throw new Error("transaction creation failed");
      }
      book.availability_status = true;
      book.return_date = Date.now();
      await book.save();

      res.status(200).send({
        success: true,
        message: "book returned successfully",
        newTransaction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  // returnBookByName: async (req, res) => {

  //   try {
  //     const { book_name, author, username, transaction_type } = req.body;
  //     if (!book_name || !author || !username || !transaction_type) {
  //       throw new Error("please provide book_id username and transaction_type");
  //     }
  //       const book = await booksModel.findOne({ book_name, author });
  //       console.log("book", book);
  //       if (!book) {
  //         throw new Error("incorrect book id");
  //       }
  //       const book_id = book._id;
  //     const user = await userModel.findOne({ username });
  //     console.log("user", user);
  //     if (!user) {
  //       throw new Error("user not found");
  //     }
  //     const user_id = user.id;

  //     const lastTransaction = await transactionModel.findOne({
  //       user_details: user_id,
  //       book_details: book_id,
  //     });
  //     if (!lastTransaction) {
  //       throw new Error("no transaction found for this user and book");
  //     }
  //     const checkReturn = await transactionModel.findOne({
  //       user_details: user_id,
  //       book_details: book_id,
  //       transaction_type: "return",
  //     });
  //     if (checkReturn) {
  //       throw new Error("book already returned");
  //     }

  //     const newTransaction = await transactionModel.create({
  //       user_details: user._id,
  //       book_details: book_id,
  //       issue_date: lastTransaction.issue_date,
  //       due_date: lastTransaction.due_date,
  //       return_date: Date.now(),
  //       transaction_type,
  //     });
  //     if (!newTransaction) {
  //       throw new Error("transaction creation failed");
  //     }
  //     book.availability_status = true;
  //     book.issue_date = Date.now();
  //     await book.save();

  //     res.status(200).send({
  //       success: true,
  //       message: "book returned successfully",
  //       newTransaction,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // },

  getUserTransactions: async (req, res) => {
    try {
      const transactions = await transactionModel
        .find({ user_details: req.params.id })
        .populate({ path: "user_details" })
        .populate({ path: "book_details" });
      if (!transactions.length) {
        throw new Error("no transactions found");
      }
      res.status(200).send({
        success: true,
        message: "User transactions fetched successfully",
        UserTransactions: transactions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getallTransactions: async (req, res) => {
    try {
      const transactions = await transactionModel
        .find()
        .populate({ path: "user_details" })
        .populate({ path: "book_details" });
      if (!transactions.length) {
        throw new Error("no transactions found");
      }
      res.status(200).send({
        success: true,
        message: "All transactions fetched successfully",
        AllTransactions: transactions,
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
