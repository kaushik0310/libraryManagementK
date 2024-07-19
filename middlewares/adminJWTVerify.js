const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    //console.log("check");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.admin = decoded.id;
    console.log("req.admin", req.admin);
    next();
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authToken;
