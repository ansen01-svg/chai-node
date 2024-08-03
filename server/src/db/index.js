const mongoose = require("mongoose");

const connectDb = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(`Error connecting to mongoDb,`, error);
    process.exit(1);
  }
};

module.exports = connectDb;
