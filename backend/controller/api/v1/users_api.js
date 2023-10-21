const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");
const Course = require("../../../models/course");

module.exports.signUp = async function (req, res) {
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username });
    if (user)
      return res.status(403).json({ message: "Username already exists" });
    const newUser = await new User({
      username,
      password,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User created successfully",
      token: jwt.sign({ username, role: "user" }, env.jwt_secret, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.login = async function (req, res) {
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (!user)
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });
    return res.status(200).json({
      message: "Logged in successfully",
      token: jwt.sign({ username, role: "user" }, env.jwt_secret, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getCourses = async function (req, res) {
  try {
    const courses = await Course.find({ published: true });
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.buyCourse = async function (req, res) {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    const course = await Course.findById(courseId);
    if (!course || !course.published)
      return res.status(404).json({ message: "Course not found" });
    req.user.purchasedCourses.push(course);
    await req.user.save();
    return res.status(200).json({
      message: "Course purchased successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getPurchasedCourses = async function (req, res) {
  try {
    const user = await req.user.populate("purchasedCourses");
    return res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
