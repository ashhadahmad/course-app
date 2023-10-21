const mongoose = require("mongoose");
const env = require("../config/environment");
mongoose
  .connect(`mongodb://${env.database_path}/${env.database_name}`)
  .then(() => {
    console.log("📚 Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ Error in connecting to DB - ", err.message);
  });

module.exports = mongoose;
