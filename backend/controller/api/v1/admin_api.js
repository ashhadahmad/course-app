const env = require("../../../config/environment");
const jwt = require("jsonwebtoken");
const Admin = require("../../../models/admin");
const Course = require("../../../models/course");

module.exports.signUp = async function (req, res) {
  try {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username });
    if (admin)
      return res.status(403).json({ message: "Username already exists" });
    const newAdmin = await new Admin({
      username,
      password,
    });
    await newAdmin.save();
    return res.status(200).json({
      message: "Admin created successfully",
      token: jwt.sign({ username, role: "admin" }, env.jwt_secret, {
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
    const admin = await Admin.findOne({ username, password });
    if (!admin)
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });
    return res.status(200).json({
      message: "Logged in successfully",
      token: jwt.sign({ username, role: "admin" }, env.jwt_secret, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.createCourse = async function (req, res) {
  try {
    const { title, description, price, imageLink, published } = req.body;
    const newCourse = new Course({
      title,
      description,
      price,
      imageLink,
      published,
      createdBy: req.user._id,
    });
    await newCourse.save();
    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse.id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.updateCourse = async function (req, res) {
  try {
    const { title, description, price, imageLink, published } = req.body;
    const courseId = req.params.courseId;
    await Course.findOneAndUpdate(
      { _id: courseId, createdBy: req.user._id },
      { title, description, price, imageLink, published }
    );
    return res.status(200).json({
      message: "Course updated successfully",
      courseId,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getCourses = async function (req, res) {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
