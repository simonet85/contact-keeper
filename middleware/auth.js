const jwt = require('jsonwebtoken');
const config = require('config');
/**
 * Middleware for private routes
 * 
 */
module.exports = (req, res, next) => {
  //Get the token
  const token = req.header('x-auth-token');
  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({ msg: ' token, is not valid' });
  }
  next();
};
