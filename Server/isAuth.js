const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: "You need to login" });
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;   // attach user to request

    next();
};

module.exports = isAuth;