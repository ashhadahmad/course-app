const express = require("express");
const mongoose = require("./config/mongoose");

const app = express();
const port = 3000;

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log("❌ Error in starting the server");
  console.log(`✅ Server is up at http://localhost:${port}`);
});
