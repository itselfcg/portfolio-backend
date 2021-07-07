const jtw = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jtw.verify(token,process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};
