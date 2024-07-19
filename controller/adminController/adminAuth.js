const adminModel = require("../../models/adminSchema");
const bcrypt = require("bcrypt");
const generateJWTToken = require("../../utils/generateJWT");

module.exports = {
  // adminSignup: async (req, res) => {
  //   const { username, name, email, contactNumber, password } =
  //     req.body;
  //   if (
  //     !username ||
  //     !name ||
  //     !email ||
  //     !contactNumber ||
  //     !password ||
  //   ) {
  //     throw new Error("please provide all required fields");
  //   }
  //   try {
  //     const checkAdmin = await adminModel.findOne({ username });
  //     if (checkAdmin) {
  //       throw new Error("admin already exists");
  //     }

  //     const admin = await adminModel.create({
  //       username,
  //       name,
  //       email,
  //       contactNumber,
  //       password,
  //     });
  //     res.status(201).send({
  //       success: true,
  //       message: "admin user created successfully",
  //       admin,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // },

  // adminLogin: async (req, res) => {
  //   try {
  //     const { username, password } = req.body;

  //     if (!username || !password) {
  //       throw new Error("please provide username and password");
  //     }

  //     const admin = await adminModel.findOne({ username });
  //     if (!admin) {
  //       throw new Error("user admin not found");
  //     }
  //     const passwordMatched = await admin.matchPassword(password);
  //     if (!passwordMatched) {
  //       throw new Error("incorrect password");
  //     }
  //     if (admin && passwordMatched) {
  //       res.status(201).send({
  //         success: true,
  //         message: "user admin logged in successfully",
  //         admin,
  //         token: generateJWTToken(admin._id),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       error: error.message,
  //       stackTrace: error.stack,
  //     });
  //   }
  // },
  async adminLogin(req, res) {
    const { username, name, email, password, contactNumber } = req.body;
    try {
      const emailList = ["admin1@yopmail.com", "admin2@yopmail.com"];
      if (!emailList.includes(email)) {
        throw new Error("Invalid admin credentials");
      }

      const admin = await adminModel.findOne({ email });

      if (!admin) {
        if (!username || !name || !email || !password || !contactNumber) {
          throw new Error(
            "Please provide username, name, email, password and contactNumber as you are logging first time"
          );
        }
        let hashedPassword = await bcrypt.hash("Admin@1234", 10);
        const createdAdmin = await adminModel.create({
          email: email,
          password: hashedPassword,
          username,
          name,
          contactNumber,
        });
        res.status(201).send({
          success: true,
          message: "Admin created successfully",
          createdAdmin,
        });
      } else {
        const isValid = bcrypt.compareSync(password, admin.password);

        if (!isValid) {
          throw new Error("Invalid admin credentials");
        }

        res.status(200).send({
          success: true,
          message: "Admin logged in successfully",
          admin,
          token: generateJWTToken(admin._id),
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
};
