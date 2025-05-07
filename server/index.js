const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {sequelize} = require("./models")

const app = express();
const port = process.env.PORT || 3000;

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});