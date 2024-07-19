const express = require("express");
const userController = require("../controller/userController/userAuth");
const userAuthentication = require("../middlewares/userJWTVerify");
const router = express.Router();



/**
 * USER ROUTES
 */
//register user
router.route("/register").post(userController.userSignup);
//user login
router.route("/login").post(userController.userLogin);

/**
 * USER AUTHENTICATION ROUTE
 */
router.use(userAuthentication);

/**
 * library catalog routes
 */
router.route("/view-catalog").get(userController.viewCatalog);

/**
 * transaction History routes
 */
router.route("/transaction-history").get(userController.transactionHistory);

module.exports = router;
