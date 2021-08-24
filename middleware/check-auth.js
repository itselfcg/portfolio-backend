const jtw = require("jsonwebtoken");
const role = require("../controller/role");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jtw.verify(token, process.env.JWT_KEY);

    const methodsAuth = role[decode.role];
    if (methodsAuth.indexOf(req.method) > -1) {
      next();
    } else {
      return res
        .status(401)
        .send(
          "Access Denied"
        );
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};
