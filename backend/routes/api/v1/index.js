const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"));
router.use("/users", require("./users"));

module.exports = router;
