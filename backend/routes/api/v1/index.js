const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello World From API V1");
});

module.exports = router;
