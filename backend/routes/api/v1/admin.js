const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../../config/custom-middleware");
const adminAPI = require("../../../controller/api/v1/admin_api");

router.post("/signup", adminAPI.signUp);
router.post("/login", adminAPI.login);
router.post("/courses", checkAuth, adminAPI.createCourse);
router.put("/courses/:courseId", checkAuth, adminAPI.updateCourse);
router.get("/courses", checkAuth, adminAPI.getCourses);

module.exports = router;
