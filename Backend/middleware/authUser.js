const jwt = require('jsonwebtoken');
const SECRET_KEY = "4715aed3c946f7b0lokoa38e6b534astan958362x8d84e96d10fbc04700770d572af3dce43625dd"


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    } else {
        const Accesstoken = token.slice(7, token.length)
        jwt.verify(Accesstoken, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid JWT tokens' });
            }
            req.user = user;
            next();
        });
    }
};

module.exports = authenticateToken;
