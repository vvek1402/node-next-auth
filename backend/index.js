const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("./config/db.config");
const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/AuthRoutes");
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

module.exports = app;
