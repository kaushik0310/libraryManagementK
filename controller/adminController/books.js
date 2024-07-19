const booksModel = require("../../models/booksSchema");

module.exports = {
  addBook: async (req, res) => {
    try {
       const { book_name, author,publisher_details } = req.body;
       if (!book_name || !author || !publisher_details) {
      throw new Error("please provide all required fields");
       }
      const check = await booksModel.find({ book_name, author });
      if (check.length) {
        throw new Error("book already added");
      }
      const book = await booksModel.create({
        book_name,
        author,
        publisher_details,
      });
      res.status(201).send({
        success: true,
        message: "book added successfully",
        addedBook: book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  removeBook: async (req, res) => {
   
    try {
       const book_id = req.params.id;
       if (!book_id) {
         throw new Error("please provide  book_id");
       }
      const book = await booksModel.findById(req.params.id);
      // console.log("book",book);
      if (!book) {
        throw new Error("book not found in inventory");
      }
      const removeBook = await booksModel.findByIdAndDelete(req.params.id);

      res.status(200).send({
        success: true,
        message: "book removed from inventory successfully",
        removedBook: removeBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  // removeBookByName: async (req, res) => {

  //   try {
  //         const { book_name, author } = req.body;
  //         if (!book_name || !author) {
  //           throw new Error("please provide all required fields");
  //         }
  //     const book = await booksModel.findOne({ book_name, author });
  //     //console.log("book",book)
  //     if (!book) {
  //       throw new Error("book not found in inventory");
  //     }
  //     const _id = book._id;
  //     //console.log("_id",_id);
  //     const removeBook = await booksModel.findByIdAndDelete(_id);
  //     res.status(200).send({
  //       success: true,
  //       message: "book removed from inventory successfully",
  //       removedBook: removeBook,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // },

  getBookById: async (req, res) => {
    const book_id = req.params.id;
    if (!book_id) {
      throw new Error("please provide  book_id");
    }
    try {
      const book = await booksModel.findById(req.params.id);
      //console.log("book",book);
      if (!book) {
        throw new Error("book not found in inventory");
      }
      res.status(200).send({
        success: true,
        message: "book fetched successfully",
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
  // getBookByName: async (req, res) => {
  //   const { book_name, author } = req.body;
  //   if (!book_name || !author) {
  //     throw new Error("please provide all required fields");
  //   }
  //   try {
  //     const book = await booksModel.findOne({ book_name, author });
  //     //console.log("book",book)
  //     if (!book) {
  //       throw new Error("book not found in inventory");
  //     }
  //     res.status(200).send({
  //       success: true,
  //       message: "book by name fetched successfully",
  //       book,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // },

  getallBooks: async (req, res) => {
    try {
      const book = await booksModel.find().populate({path: "publisher_details", select: "publisher_name address"});
      console.log("book",book);
      if (!book) {
        throw new Error("book not found in inventory");
      }
      res.status(200).send({
        success: true,
        message: "all books fetched successfully",
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
};
