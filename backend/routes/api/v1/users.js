const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../../config/custom-middleware");
const usersAPI = require("../../../controller/api/v1/users_api");

router.post("/signup", usersAPI.signUp);
router.post("/login", usersAPI.login);
router.get("/courses", checkAuth, usersAPI.getCourses);
router.post("/courses/:courseId", checkAuth, usersAPI.buyCourse);
router.get("/purchasedCourses", checkAuth, usersAPI.getPurchasedCourses);

module.exports = router;
