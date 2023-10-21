const express = require("express");
const router = express.Router();

console.log("🏎️  Router Loaded");

router.get("/", function (req, res) {
  res.send("Hello World");
});

router.use("/api", require("./api"));

module.exports = router;
