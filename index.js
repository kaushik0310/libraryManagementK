//importing express
const express = require("express");
//creating instance of express
const app = express();

//handling cross origin request
const cors = require("cors");
app.use(cors());

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

//db connection
const connectDb = require("./config/db");
connectDb();

//parsing json bodies
app.use(express.json());


//route handling
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/admin", require("./routes/admin"));

//port assign
const PORT = process.env.PORT || 4000;

//server create
app.listen(PORT, () => {
  console.log(`Server running on port no. : ${PORT}`);
});
