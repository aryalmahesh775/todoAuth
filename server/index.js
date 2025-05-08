const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const authRoute = require("./routes/authRoute");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookie());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  // preflightContinue: false,
  // allowedHeaders: ["content-type", "Authorization"],
};

app.use(cors(corsOptions));

// Routes
app.use("/", authRoute);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
