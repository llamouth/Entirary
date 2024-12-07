const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.warn("Token not found in Authorization header");
        return res.status(401).json({ error: "Access Denied. No token found" });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.error("JWT Verification Failed:", err.message);
            return res.status(403).json({ error: 'Invalid token.' });
        }
        console.log('Decoded token:', user); // Log the decoded token
        req.user = user; // 'user' contains 'id' and 'username'
        next();
    });
};

module.exports = { authenticateToken };