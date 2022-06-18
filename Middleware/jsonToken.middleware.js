require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config.json')


// Generate JWT Token
function generateToken(username, role) {
    try {
        let jwtsecretkey = config.Jwt.JWT_SECRET_KEY;
        let data = {
            date: Date(),
            username: username,
            role: role
        }
        return token = jwt.sign(data, jwtsecretkey, config.Jwt.access_token);
    } catch (err) {
        console.log(err);
    }

    res.send(token);
}

//Validate JWT Token
function validateToken() {
    let TokenHeaderKey = config.Jwt.TOKEN_HEADER_KEY;
    let jwtSecretKey = config.Jwt.JWT_SECRET_KEY;

    try {
        const token = req.header(TokenHeaderKey)
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(err);
        }
    } catch (err) {
        return res.status(401).send(error);
    }
}

module.exports = { generateToken, validateToken }