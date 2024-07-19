const userModel = require("../../models/userSchema");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("user not found");
      }
      res.status(200).send({
        success: true,
        message: "user fetched successfully",
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

  getallUser: async (req, res) => {
    try {
      const user = await userModel.find();
      if (!user) {
        throw new Error("no user found");
      }
      res.status(200).send({
        success: true,
        message: "All users fetched successfully",
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
};
