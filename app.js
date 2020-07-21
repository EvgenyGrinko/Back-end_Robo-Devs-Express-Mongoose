const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

// const transactions = require("./routes/transactions");
const developers = require("./routes/developers");

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/v1/transactions", transactions);
app.use("/api/developers", developers);

app.use(
  express.static(path.join("/home/user/Desktop/robo-developers/client/"))
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
