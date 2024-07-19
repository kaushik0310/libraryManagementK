const publisherModel = require("../../models/publisherSchema");

module.exports = {
  addPublisher: async (req, res) => {
    try {
      const { publisher_name, address } = req.body;
      if (!publisher_name || !address) {
        throw new Error("please provide all required fields");
      }
      const check = await publisherModel.find({ publisher_name, address });
      if (check.length) {
        throw new Error("publisher already added");
      }
      const publisher = await publisherModel.create({
        publisher_name,
        address,
      });
      res.status(201).send({
        success: true,
        message: "publisher added successfully",
        addedPublisher: publisher,
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
