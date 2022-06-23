const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ msg: "TOKEN_NOT_FOUND" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "TOKEN_EXPIRED" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "SERVER_ERROR" });
  }
};
