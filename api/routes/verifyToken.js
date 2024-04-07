const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authUser = async (req, res, next) => {
    try {
        // console.log(req);
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        
        next();
    }
    catch (err) {
        res.status(401).json("auth failed please login again")
    }
}

module.exports = { authUser };