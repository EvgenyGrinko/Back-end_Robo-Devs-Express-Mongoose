const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);//method instructs Node.js to terminate the process synchronously with an exit status of (code)
  //To shut down the application
  }
};

module.exports = connectDB;
