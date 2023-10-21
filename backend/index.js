const express = require("express");
const mongoose = require("./config/mongoose");
const env = require("./config/environment");

const app = express();
const port = env.port || 3000;

app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log("❌ Error in starting the server");
  console.log(`✅ Server is up at http://localhost:${port}`);
});
