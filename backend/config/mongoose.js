const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/courses_app_dev")
  .then(() => {
    console.log("📚 Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ Error in connecting to DB - ", err.message);
  });

module.exports = mongoose;
