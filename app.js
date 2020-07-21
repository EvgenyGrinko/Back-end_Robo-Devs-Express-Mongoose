const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

//Import routes
const developers = require("./routes/developers");
const authRoute = require('./routes/auth');

const app = express();

//Middlewares
app.use(express.json());//body parser
app.use(cors());

//Route middlewares
app.use("/api/developers", developers);
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
