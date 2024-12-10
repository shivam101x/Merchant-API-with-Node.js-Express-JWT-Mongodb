const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.merchantId = verified.id;  // Attach merchant's ID to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
