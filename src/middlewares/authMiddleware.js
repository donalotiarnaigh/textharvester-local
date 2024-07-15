const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header or cookies
  const token = req.header('x-auth-token') || req.cookies.token;

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log the error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
