const env = require("./environment");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");

module.exports.checkAuth = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  token = authHeader.split(" ")[1];
  jwt.verify(token, env.jwt_secret, async (err, user) => {
    if (err) return res.status(403).json({ message: "Unauthorized" });
    else {
      let userObj;
      if (user.role === "admin")
        userObj = await Admin.findOne({ username: user.username });
      if (user.role === "user")
        userObj = await User.findOne({ username: user.username });
      req.user = userObj;
      next();
    }
  });
};
