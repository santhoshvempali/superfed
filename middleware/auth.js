const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).send("Access denied.");
        const bearer=token.split(" ")
        const bearertoken=bearer[1]
        const decoded = jwt.verify(bearertoken, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};