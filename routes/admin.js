const express = require("express");
const router = express.Router();
const adminAuthentication = require("../middlewares/adminJWTVerify");
const authController = require("../controller/adminController/adminAuth");
const booksController = require("../controller/adminController/books");
const transactionController = require("../controller/adminController/transactions");
const publisherController = require("../controller/adminController/publisher")
const userController = require("../controller/adminController/user")




/**
 * ADMIN ROUTES
 */
//admin login
router.route("/login").post(authController.adminLogin);

/**
 * ADMIN AUTHENTICATION ROUTE
 */
router.use(adminAuthentication);

/**
 * BOOK ROUTES
 */
//add book to inventory
router.route("/add-book").post(booksController.addBook);
//remove book from inventory
router.route("/remove-book/:id").delete(booksController.removeBook);
//get book by id
router.route("/get-book/:id").get(booksController.getBookById);
//get all books
router.route("/get-all-books").get(booksController.getallBooks);

/**
 * TRANSACTION ROUTES
 */
//issue book to user by id
router.route("/issue-book").post(transactionController.issueBookById);
//return book to inventory by id
router.route("/return-book-by-id").post(transactionController.returnBookById);
//get transactions of user by user_id
router.route("/get-user-transactions/:id").get(transactionController.getUserTransactions);
//get all library transactions
router.route("/get-all-transactions").get(transactionController.getallTransactions);

/**
 * PUBLISHER ROUTES
 */
router.route("/add-publisher").post(publisherController.addPublisher);

/**
 * USER ROUTES
 */
//get user by id
router.route("/get-user/:id").get(userController.getUser);

//get all user by 
router.route("/get-all-user").get(userController.getallUser);

module.exports = router;
