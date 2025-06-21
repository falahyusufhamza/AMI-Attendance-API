const jwt = require("jsonwebtoken");

exports.authorise = (req, res, next) => {
    const authToken = req.cookies?.authToken;
    if (!authToken) {
        return res.status(401).json({
            message: "Token missing"
        })
    }
    const verifiedToken = jwt.verify(authToken, process.env.JWT_SIGNER);
    if (!verifiedToken) return res.status(401).json({
        message: "Unauthorised access"
    })
    req.userDetails = verifiedToken;
    next();
}