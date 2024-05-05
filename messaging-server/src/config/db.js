const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require('colors');

dotenv.config();
const ConnectDatabase = async () => {
  try {
    const instance = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`Database connection established ${instance.connection.host}`.cyan.underline)
  } catch (error) {

    console.error("Error connecting", error)
    process.exit();


  }
};


module.exports = ConnectDatabase;